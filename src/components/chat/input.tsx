import React, { useEffect, useState } from "react";
import { useMessagingContext, useUserPreferences } from "~/providers";
import { useDebounce } from "use-debounce";
import { Editor } from "./editor";

interface InputProps {
  sendTypingEvent: (typing: boolean) => void;
}

export const Input: React.FC<InputProps> = ({ sendTypingEvent }) => {
  const { text, setText } = useMessagingContext();
  const [intent, setIntent] = useState<boolean>(false);
  const [debouncedText] = useDebounce(text, 300);
  const { updateUserSettings, getUserSettings } = useUserPreferences();
  const { typing: userTyping } = getUserSettings();

  const broadcastTypingStatus = () => {
    // for intent on typing
    let needsUserUpdate = false;
    if (intent) {
      if (debouncedText.length && !userTyping) {
        sendTypingEvent(intent);
        needsUserUpdate = true;
      }
    } else {
      // for intent on not typing
      if (userTyping) {
        sendTypingEvent(intent);
        needsUserUpdate = true;
      }
    }

    // update when we need to so we don't fire typing event too much
    if (needsUserUpdate) {
      updateUserSettings({
        ...getUserSettings(),
        typing: intent,
      });
    }
  };

  useEffect(() => {
    broadcastTypingStatus();
  }, [debouncedText, intent]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* <textarea
        className=" scrollbar highlight-white/5 text-m h-32 w-full resize-none rounded-md bg-slate-800 p-2 text-sky-50 caret-sky-500 shadow-sm ring-slate-900/10 focus:bg-slate-900 focus:outline-none focus:ring-2  focus:ring-sky-500 "
        rows={2}
        placeholder="..."
        onChange={(e) => {
          setText(e.target.value);
        }}
        onFocus={() => setIntent(true)}
        onBlur={() => setIntent(false)}
        value={text}
      ></textarea> */}

      <Editor />
    </div>
  );
};
