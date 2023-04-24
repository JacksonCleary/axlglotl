import React, { useState } from "react";
import { Window } from "./window";
import { Input } from "./input";
import { InputActions } from "./input-actions";
import { useDebounce } from "use-debounce";
import { useShellContext, useApplicationSettings } from "~/providers";
import { useRoom } from "~/hooks";
import { v4 as uuid } from "uuid";

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
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 300);

  const applicationSettings = useApplicationSettings();
  const shellContext = useShellContext();

  const {
    isMessageSending,
    messageLog,
    peerRoom,
    roomContextValue,
    sendMessage,
  } = useRoom(
    {
      appId,
      // password,
    },
    {
      roomId,
      userId,
      getUuid,
    }
  );

  const handleMessageSubmit = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col gap-4  ">
      <div className="relative flex flex-row gap-4 ">
        <Window log={messageLog} />
      </div>
      <div className="flex flex-row gap-4  ">
        <Input setText={setText} />
        <InputActions
          setText={setText}
          value={debouncedText}
          messageSubmit={handleMessageSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
