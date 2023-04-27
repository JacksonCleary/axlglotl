import { useEffect, useMemo, useState } from "react";
import { type BaseRoomConfig } from "trystero";
import { type FirebaseRoomConfig } from "trystero/firebase";
import { v4 as uuid } from "uuid";
import { getRandomUntakenAvatarBGId } from "~/utils";
import {
  useApplicationSettings,
  useShellContext,
  useUserPreferences,
} from "~/providers";
import {
  type ReceivedMessage,
  type IncomingUntranslatedMessage,
  type OutgoingTranslatedMessage,
  type User,
  PeerActions,
  type AlertOptions,
  isMessageReceived,
} from "~/models";
import { usePeerNameDisplay } from "~/hooks";
import {
  Audio as AudioService,
  NotificationService,
  PeerRoom,
  PeerHookType,
} from "~/services";

import { usePeerRoomAction } from "./usePeerRoomAction";

interface UseRoomConfig {
  roomId: string;
  userId: string;
  getUuid?: typeof uuid;
}

export function useRoom(
  { password, ...roomConfig }: BaseRoomConfig & FirebaseRoomConfig,
  { roomId, userId, getUuid = uuid }: UseRoomConfig
) {
  const isPrivate = password !== undefined;

  const [peerRoom] = useState(
    () => new PeerRoom({ password: password ?? roomId, ...roomConfig }, roomId)
  );

  const {
    peerList,
    setPeerList,
    tabHasFocus,
    showAlert,
    setRoomId,
    setPassword,
    customUsername,
  } = useShellContext();

  const userPreferences = useUserPreferences();
  const settingsContext = useApplicationSettings();
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [messageLog, _setMessageLog] = useState<Array<ReceivedMessage>>([]);
  const [newMessageAudio] = useState(() => new AudioService());
  const { getDisplayUsername } = usePeerNameDisplay();

  const messageTranscriptSizeLimit = settingsContext.messageTranscriptSizeLimit;

  const setMessageLog = (messages: Array<ReceivedMessage>) => {
    if (messages.length > messageTranscriptSizeLimit) {
      //   const evictedMessages = messages.slice(
      //     0,
      //     messages.length - messageTranscriptSizeLimit
      //   );
      //     for (const message of evictedMessages) {
      //       if (
      //         isInlineMedia(message) &&
      //         fileTransfer.isOffering(message.magnetURI)
      //       ) {
      //         fileTransfer.rescind(message.magnetURI)
      //       }
      //     }
    }

    _setMessageLog(messages.slice(-messageTranscriptSizeLimit));
  };

  const [isShowingMessages, setIsShowingMessages] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const roomContextValue = useMemo(
    () => ({
      isPrivate,
      isMessageSending,
      isShowingMessages,
      setIsShowingMessages,
      unreadMessages,
    }),
    [
      isPrivate,
      isMessageSending,
      isShowingMessages,
      setIsShowingMessages,
      unreadMessages,
    ]
  );

  useEffect(() => {
    return () => {
      peerRoom.leaveRoom();
      setPeerList([]);
    };
  }, [peerRoom, setPeerList]);

  useEffect(() => {
    setPassword(password);

    return () => {
      setPassword(undefined);
    };
  }, [password, setPassword]);

  useEffect(() => {
    console.log("SET ROOM ID");
    setRoomId(roomId);

    return () => {
      setRoomId(undefined);
    };
  }, [roomId, setRoomId]);

  useEffect(() => {
    if (isShowingMessages) setUnreadMessages(0);
  }, [isShowingMessages, setUnreadMessages]);

  const [sendPeerMetadata, receivePeerMetadata] = usePeerRoomAction<User>(
    peerRoom,
    PeerActions.PEER_METADATA
  );

  const [sendMessageTranscript, receiveMessageTranscript] = usePeerRoomAction<
    Array<ReceivedMessage>
  >(peerRoom, PeerActions.MESSAGE_TRANSCRIPT);

  const [sendPeerMessage, receivePeerMessage] =
    usePeerRoomAction<IncomingUntranslatedMessage>(
      peerRoom,
      PeerActions.MESSAGE
    );

  const sendMessage = async (message: string) => {
    console.log("sending message");
    console.log("isMessageSending", isMessageSending);
    if (isMessageSending) return;

    const unsentMessage: IncomingUntranslatedMessage = {
      untranslatedMessage: message,
      timestamp: Date.now(),
      messageID: getUuid(),
      userId,
    };

    setIsMessageSending(true);
    setMessageLog([...messageLog, unsentMessage]);
    await sendPeerMessage(unsentMessage);

    setMessageLog([
      ...messageLog,
      {
        ...unsentMessage,
        translatedMessage: unsentMessage.untranslatedMessage,
        translatedTimestamp: Date.now(),
      },
    ]);
    setIsMessageSending(false);
  };

  receivePeerMetadata(({ id, customUsername }, peerId: string) => {
    console.log("RECEIVE PEER METADATA");
    console.log("peerId", peerId);
    const peerIndex = peerList.findIndex((peer) => peer.id === peerId);
    console.log("peerIndex", peerIndex);

    if (peerIndex === -1) {
      console.log("ADD PEER TO PEERLIST");
      setPeerList([
        ...peerList,
        {
          id,
          customUsername,
          avatarID: getRandomUntakenAvatarBGId(peerList),
        },
      ]);
    } else {
      const oldUsername = peerList[peerIndex]?.customUsername || id;
      const newUsername = customUsername || id;

      const newPeerList = [...peerList];
      const newPeer: User = {
        avatarID: newPeerList[peerIndex]?.avatarID,
        id,
        customUsername,
      };
      newPeerList[peerIndex] = newPeer;
      setPeerList(newPeerList);

      if (oldUsername !== newUsername) {
        showAlert(`${oldUsername} is now ${newUsername}`);
      }
    }
  });

  receiveMessageTranscript((transcript: Array<OutgoingTranslatedMessage>) => {
    if (messageLog.length) return;

    setMessageLog(transcript);
  });

  receivePeerMessage((message) => {
    const userSettings = userPreferences.getUserSettings();

    if (!isShowingMessages) {
      setUnreadMessages(unreadMessages + 1);
    }

    if (!tabHasFocus || !isShowingMessages) {
      if (userSettings.playSoundOnNewMessage) {
        // newMessageAudio.play();
      }

      if (userSettings.showNotificationOnNewMessage) {
        const displayUsername = getDisplayUsername(message?.user?.id);

        NotificationService.showNotification(
          `${displayUsername}: ${message.untranslatedMessage}`
        );
      }
    }

    setMessageLog([...messageLog, { ...message, timeReceived: Date.now() }]);
  });

  peerRoom.onPeerJoin(PeerHookType.NEW_PEER, (peerId: string) => {
    console.log("PEER ENTER");
    showAlert(`Someone has joined the room`, "success");
    void (async () => {
      try {
        const promises: Promise<any>[] = [
          sendPeerMetadata({ id: userId, customUsername }, peerId),
        ];

        // if (!isPrivate) {
        promises.push(
          sendMessageTranscript(messageLog.filter(isMessageReceived), peerId)
        );
        // }

        await Promise.all(promises);
      } catch (e) {
        console.error(e);
      }
    })();
  });

  peerRoom.onPeerLeave(PeerHookType.NEW_PEER, (peerId: string) => {
    console.log("PEER HAS LEFT");
    const peerIndex = peerList.findIndex((peer) => peer.id === peerId);
    const peerExist = peerIndex !== -1;
    const maybeName = peerExist;
    const maybeUser = peerList[peerIndex]?.id;
    const severity: AlertOptions = "warning";
    showAlert(
      `${
        maybeName && maybeUser ? getDisplayUsername(maybeUser) : "Someone"
      } has left the room`,
      severity
    );

    if (peerExist) {
      const peerListClone = [...peerList];
      peerListClone.splice(peerIndex, 1);
      setPeerList(peerListClone);
    }
  });

  useEffect(() => {
    console.log("SEND PEER USEEFFECT");
    console.log("userId", userId);
    () => sendPeerMetadata({ customUsername, id: userId });
  }, [customUsername, userId, sendPeerMetadata]);

  return {
    isPrivate,
    isMessageSending,
    messageLog,
    peerRoom,
    roomContextValue,
    sendMessage,
  };
}
