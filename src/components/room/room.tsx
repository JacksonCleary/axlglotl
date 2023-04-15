import React, { type ChangeEvent, useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useApplicationSettings } from "~/providers";

export const Room: React.FC = () => {
  const applicationSettings = useApplicationSettings();
  const [inputVal, setInputVal] = useState<string>("");
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

  console.log("applicationSettings", applicationSettings);
  //   console.log("error", error);
  //   console.log("isSuccess", isSuccess);
  //   console.log("chatLog", chatLog?.data);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    setInputVal(e.target.value);
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputVal) return;
    console.log("inputVal", inputVal);
    mutate({ text: inputVal });
  };

  const resetInput = () => {
    setInputVal("");
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
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChangeHandler} value={inputVal} />
        <button type="submit">Submit</button>
      </form>
      {chatLog?.data}
    </div>
  );
};
