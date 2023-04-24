import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { UIButton } from "~/components/ui/button";
import { api } from "~/utils/api";
import { type User } from "~/models";
interface InputActionsProps {
  value: string;
  setText: Dispatch<SetStateAction<string>>;
  messageSubmit: (message: string) => Promise<void>;
}

export const InputActions: React.FC<InputActionsProps> = ({
  value,
  setText,
  messageSubmit,
}) => {
  const utils = api.useContext();
  const chatLog = api.chat.getChatlog.useQuery();
  const { mutate, error, isSuccess } = api.chat.addChatInput.useMutation({
    async onSuccess() {
      try {
        await utils.chat.getChatlog.invalidate();
      } catch (e) {
        console.log("e", e);
      }
    },
  });

  // const user: User = {
  //   id: "foo",
  //   username: "bar",
  //   avatarID: "hexagons",
  // };

  const resetInput = () => {
    setText("");
  };

  const onSubmit = async () => {
    console.log("inputVal", value);
    if (!value) return;

    // mutate({ text: value, user });
    console.log("submit message");
    await messageSubmit(value);
  };

  const onEmoji = async () => {
    const myPromise = new Promise<void>((resolve): void => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
    return myPromise;
  };

  useEffect(() => {
    let mounted = true;
    if (isSuccess && mounted) {
      resetInput();
    }
    return () => {
      mounted = false;
    };
  }, [isSuccess]);

  return (
    <div className="flex flex-col gap-4  ">
      <UIButton
        title={"Submit Your Message"}
        action={onSubmit}
        disabled={!value}
      >
        <span>Submit</span>
      </UIButton>
      <UIButton title={"Insert Emoji"} action={onEmoji} disabled={!value}>
        <span>Emoji</span>
      </UIButton>
    </div>
  );
};
