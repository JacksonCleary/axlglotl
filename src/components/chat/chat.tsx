import React, { useState } from "react";
import { Window } from "./window";
import { Input } from "./input";
import { InputActions } from "./input-actions";
import { useDebounce } from "use-debounce";

export const Chat: React.FC = () => {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 500);

  return (
    <div className="flex flex-col gap-4  ">
      <div className="relative flex flex-row gap-4 ">
        <Window />
      </div>
      <div className="flex flex-row gap-4  ">
        <Input setText={setText} value={debouncedText} />
        <InputActions value={debouncedText} />
      </div>
    </div>
  );
};
