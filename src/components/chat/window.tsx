import React from "react";
import { api } from "~/utils/api";
import { type OutgoingTranslatedMessage } from "~/models";
import { Message } from "./message";

const mockChat: OutgoingTranslatedMessage[] = [
  {
    messageID: "lkajslfjlsdfj",
    timestamp: new Date(),
    untranslatedMessage: "foo",
    translatedMessage:
      "THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN THIS IS THE START OF THE TEXT CHAIN",
    user: {
      id: "lfkajsldkfj",
      username: "foo",
      avatarID: "endless-clouds",
      customUsername: "squiggles",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: new Date(),
    untranslatedMessage: "bat",
    translatedMessage:
      "this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message this is a translated message",
    user: {
      id: "lfkajsldkfj",
      username: "bar",
      avatarID: "charlie-brown",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: new Date(),
    untranslatedMessage: "foo",
    translatedMessage: "this is a translated message",
    user: {
      id: "lfkajsldkfj",
      username: "foo",
      avatarID: "endless-clouds",
      customUsername: "squiggles",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: new Date(),
    untranslatedMessage: "bat",
    translatedMessage: "this is a translated message",
    user: {
      id: "lfkajsldkfj",
      username: "bar",
      avatarID: "charlie-brown",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: new Date(),
    untranslatedMessage: "foo",
    translatedMessage: "this is a translated message",
    user: {
      id: "lfkajsldkfj",
      username: "foo",
      avatarID: "endless-clouds",
      customUsername: "squiggles",
    },
  },
  {
    messageID: "lkajslfjlsdfj",
    timestamp: new Date(),
    untranslatedMessage: "bat",
    translatedMessage: "THIS IS THE END OF THE TEXT CHAIN",
    user: {
      id: "lfkajsldkfj",
      username: "bar",
      avatarID: "charlie-brown",
    },
  },
];

export const Window: React.FC = () => {
  return (
    <div className="scrollbar container flex max-h-[35rem] flex-col gap-10 overflow-y-scroll rounded border border-sky-300 bg-sky-950 p-4 ">
      {mockChat.map((message, index) => (
        <Message
          key={`message-${message.messageID}-${index}`}
          message={message}
          isYou={message.untranslatedMessage === "bat"}
        />
      ))}
    </div>
  );
};
