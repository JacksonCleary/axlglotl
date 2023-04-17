import React from "react";
import { Window } from "./window";
import { Input } from "./input";

export const Chat: React.FC = () => {
  return (
    <div className="flex flex-col gap-4  ">
      <Window />
      <Input />
    </div>
  );
};
