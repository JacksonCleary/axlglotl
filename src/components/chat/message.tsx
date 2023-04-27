import React from "react";
import {
  type OutgoingTranslatedMessage,
  type UserID,
  type Avatar,
  type CustomUserName,
} from "~/models";
import { User } from "../users";
import { useUserPreferences, useShellContext } from "~/providers";
interface MessageProps {
  message: OutgoingTranslatedMessage;
  isYou?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const userPreferences = useUserPreferences();
  const { userId, customUsername } = userPreferences.getUserSettings();
  const { peerList } = useShellContext();
  const isYou = message.userId === userId;

  let username: UserID | CustomUserName = "";
  let avatarID: Avatar = "unknown";
  if (isYou) {
    username = customUsername || userId;
  } else {
    const foundUserInPeerList = peerList.find(
      (peer) => message.userId === peer.id
    );
    if (foundUserInPeerList) {
      username = foundUserInPeerList.customUsername || foundUserInPeerList.id;
      avatarID = foundUserInPeerList.avatarID;
    }
  }

  const alignmentClasses = isYou
    ? "self-end flex-row-reverse"
    : "flex-row gap-3";

  const colorClasses = isYou
    ? "bg-white/10 border border-sky-300"
    : "bg-sky-950 border border-sky-300";

  return (
    <div className={`${alignmentClasses} flex w-full items-end`}>
      <User username={username} avatarID={avatarID} showAvatar={!isYou} />
      <p
        className={`text-1xl rounded-l  px-2 py-1 text-sky-50 ${colorClasses}`}
      >
        {message.untranslatedMessage}
      </p>
    </div>
  );
};
