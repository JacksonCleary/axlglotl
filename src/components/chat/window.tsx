import React from "react";
import { api } from "~/utils/api";
import { type OutgoingTranslatedMessage, type ReceivedMessage } from "~/models";
import { Message } from "./message";

const mockChat: OutgoingTranslatedMessage[] = [
  {
    messageID: "lkajslfjlsdfj",
    timestamp: Date.now(),
    untranslatedMessage: "foo",
    translatedMessage:
      "THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN",
    user: {
      id: "lfkajsldkfj",
      avatarID: "endless-clouds",
      customUsername: "squiggles",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: Date.now(),
    untranslatedMessage: "bat",
    translatedMessage:
      "this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message",
    user: {
      id: "lfkajsldkfj",
      avatarID: "charlie-brown",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: Date.now(),
    untranslatedMessage: "foo",
    translatedMessage: "this is a translated message",
    user: {
      id: "lfkajsldkfj",
      avatarID: "endless-clouds",
      customUsername: "squiggles",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: Date.now(),
    untranslatedMessage: "bat",
    translatedMessage: "this is a translated message",
    user: {
      id: "lfkajsldkfj",
      avatarID: "charlie-brown",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: Date.now(),
    untranslatedMessage: "foo",
    translatedMessage: "this is a translated message",
    user: {
      id: "lfkajsldkfj",
      avatarID: "endless-clouds",
      customUsername: "squiggles",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: Date.now(),
    untranslatedMessage: "bat",
    translatedMessage: "THIS IS THE END OF THE TEXT CHAIN",
    user: {
      id: "lfkajsldkfj",
      avatarID: "charlie-brown",
    },
  },
];

interface WindowProps {
  log: ReceivedMessage[];
}

export const Window: React.FC<WindowProps> = ({ log }) => {
  return (
    <>
      <div
        className={
          "pointer-events-none absolute top-0 z-0 h-9 w-full bg-gradient-to-t from-[rgba(0,0,0,0)] to-slate-900"
        }
      ></div>
      <div className="scrollbar container relative z-10 flex max-h-[35rem] flex-col gap-10 overflow-y-scroll rounded border border-sky-300 bg-sky-950 bg-opacity-30 p-4 ">
        {log.map((message, index) => {
          console.log("message", message);
          return (
            <Message
              key={`message-${message.messageID}-${index}`}
              message={message}
              isYou={message.untranslatedMessage === "bat"}
            />
          );
        })}
      </div>
    </>
  );
};
