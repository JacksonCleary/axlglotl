import React from "react";

export const Input: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <textarea
        className=" scrollbar highlight-white/5 text-m h-32 w-full resize-none rounded-md bg-slate-800 p-2 text-[#f0f9ff] caret-sky-500 shadow-sm ring-slate-900/10 focus:bg-slate-900 focus:outline-none focus:ring-2  focus:ring-sky-500 "
        rows={2}
        placeholder="Start Typing!.."
      ></textarea>
    </div>
  );
};
