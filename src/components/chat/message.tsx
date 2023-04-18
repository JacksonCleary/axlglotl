import React from "react";
import { type OutgoingTranslatedMessage } from "~/models";
import { User } from "../users";
interface MessageProps {
  message: OutgoingTranslatedMessage;
  isYou?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isYou = false }) => {
  const alignmentClasses = isYou
    ? "self-end flex-row-reverse"
    : "flex-row gap-3";

  const colorClasses = isYou
    ? "bg-white/10 border border-sky-300"
    : "bg-sky-950 border border-sky-300";

  return (
    <div className={`${alignmentClasses} flex w-full items-end`}>
      <User user={message.user} showAvatar={!isYou} />
      <p
        className={`text-1xl rounded-l  px-2 py-1 text-sky-50 ${colorClasses}`}
      >
        {message.translatedMessage}
      </p>
    </div>
  );
};
