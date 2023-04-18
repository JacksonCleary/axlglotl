import React from "react";
import { UIButton } from "~/components/ui/button";

interface InputActionsProps {
  value: string;
}

export const InputActions: React.FC<InputActionsProps> = ({ value }) => {
  return (
    <div className="flex flex-col gap-4  ">
      <UIButton
        title={"Submit Your Message"}
        action={() => console.log("submit")}
        disabled={!value}
      >
        <span>Submit</span>
      </UIButton>
      <UIButton
        title={"Insert Emoji"}
        action={() => console.log("insert emoji")}
        disabled={!value}
      >
        <span>Emoji</span>
      </UIButton>
    </div>
  );
};
