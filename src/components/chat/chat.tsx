import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Window } from "./window";
import { Input } from "./input";
import { InputActions } from "./input-actions";

import {
  useShellContext,
  useApplicationSettings,
  useUserPreferences,
  MessagingContextProvider,
  type MessagingContextProps,
} from "~/providers";
import { useRoom } from "~/hooks";
import { v4 as uuid } from "uuid";
import { Drawer } from "../drawer";
import { useDebounce } from "use-debounce";

interface ChatProps {
  appId: string;
  roomId: string;
  userId: string;
  getUuid?: typeof uuid;
}

const Chat: React.FC<ChatProps> = ({
  appId,
  roomId,
  userId,
  getUuid = uuid,
}) => {
  const { getUserSettings } = useUserPreferences();

  const { rtcConfig } = useApplicationSettings();
  const shellContext = useShellContext();

  const { peerList } = shellContext;

  const {
    isMessageSending,
    messageLog,
    peerRoom,
    roomContextValue,
    sendMessage,
    asyncSendPeerTyping,
  } = useRoom(
    {
      appId,
      // password,
      rtcConfig,
    },
    {
      roomId,
      userId,
      getUuid,
    }
  );

  // messaging settings
  const [text, setText] = useState<string>("");
  const resetInput = useCallback(() => {
    setText("");
  }, []);
  const onSubmit = useCallback<(message: string) => Promise<void>>(
    async (message: string) => {
      await sendMessage(message);
      resetInput();
    },
    [sendMessage, resetInput]
  );
  //TODO
  const onEmoji = useCallback(async () => {
    const myPromise = new Promise<void>((resolve): void => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
    return myPromise;
  }, []);

  const textContext: MessagingContextProps = useMemo(
    () => ({
      text: text,
      setText,
      onSubmit,
      onEmoji,
      resetInput,
    }),
    [text, setText, onSubmit, onEmoji, resetInput]
  );

  useEffect(() => {
    console.log("shellContext.peerList", shellContext.peerList);
  }, [shellContext.peerList]);

  return (
    <MessagingContextProvider defaultStateOverride={textContext}>
      <div className="flex w-full flex-col gap-4">
        <div className="relative flex flex-row gap-4 ">
          <Window log={messageLog} />
          <Drawer />
        </div>

        <div className="flex flex-col gap-2  ">
          <Input sendTypingEvent={asyncSendPeerTyping} />
          <InputActions />
        </div>
      </div>
    </MessagingContextProvider>
  );
};

export default Chat;
