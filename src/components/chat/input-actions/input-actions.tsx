import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { UIButton } from "~/components/ui/button";
import { api } from "~/utils/api";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useMessagingContext } from "~/providers";

export const InputActions: React.FC = () => {
  const { text, onSubmit, onEmoji } = useMessagingContext();

  // const utils = api.useContext();
  // const chatLog = api.chat.getChatlog.useQuery();
  // const { mutate, error, isSuccess } = api.chat.addChatInput.useMutation({
  //   async onSuccess() {
  //     try {
  //       await utils.chat.getChatlog.invalidate();
  //     } catch (e) {
  //       console.log("e", e);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   let mounted = true;
  //   if (isSuccess && mounted) {
  //     resetInput();
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  // }, [isSuccess]);

  return (
    <div className="flex flex-col  ">
      <UIButton
        title={"Submit Your Message"}
        action={() => onSubmit(text)}
        disabled={!text}
      >
        <span>Submit</span>
      </UIButton>
      {/* <UIButton
        title={"Insert Emoji"}
        action={onEmoji}
        disabled={!debouncedText}
      >
        <span>Emoji</span>
      </UIButton> */}
    </div>
  );
};
