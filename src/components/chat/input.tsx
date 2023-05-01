import React from "react";
import { useMessagingContext } from "~/providers";

interface InputProps {
  sendTypingEvent: (typing: boolean) => void;
}

export const Input: React.FC<InputProps> = ({ sendTypingEvent }) => {
  const { setText } = useMessagingContext();

  const broadcastTypingStatus = (typing: boolean) => {
    console.log("broadcast typing -", typing);
    sendTypingEvent(typing);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <textarea
        className=" scrollbar highlight-white/5 text-m h-32 w-full resize-none rounded-md bg-slate-800 p-2 text-sky-50 caret-sky-500 shadow-sm ring-slate-900/10 focus:bg-slate-900 focus:outline-none focus:ring-2  focus:ring-sky-500 "
        rows={2}
        placeholder="..."
        onChange={(e) => {
          setText(e.target.value);
        }}
        onFocus={() => broadcastTypingStatus(true)}
        onBlur={() => broadcastTypingStatus(false)}
      ></textarea>
    </div>
  );
};
