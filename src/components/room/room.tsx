import React, { type ChangeEvent, useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useApplicationSettings } from "~/providers";
import { User } from "~/models";
import { Chat } from "../chat";

export const Room: React.FC = () => {
  const applicationSettings = useApplicationSettings();
  const [inputVal, setInputVal] = useState<string>("");
  const [user, setUser] = useState<User>({
    id: "x",
    username: "zzz",
  });
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
    mutate({ text: inputVal, user });
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#082f49] to-[#0f172a]">
      <div className="container flex w-5/6 flex-col items-center justify-center border border-sky-500 p-4 ">
        <Chat />
      </div>
    </main>
  );
};
