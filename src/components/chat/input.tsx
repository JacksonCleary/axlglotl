import React, { type Dispatch, type SetStateAction } from "react";

interface InputProps {
  setText: Dispatch<SetStateAction<string>>;
  value: string;
}

export const Input: React.FC<InputProps> = ({ setText, value }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <textarea
        className=" scrollbar highlight-white/5 text-m h-32 w-full resize-none rounded-md bg-slate-800 p-2 text-sky-50 caret-sky-500 shadow-sm ring-slate-900/10 focus:bg-slate-900 focus:outline-none focus:ring-2  focus:ring-sky-500 "
        rows={2}
        placeholder="Start Typing!.."
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
    </div>
  );
};
