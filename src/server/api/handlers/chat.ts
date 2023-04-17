import { type User } from "~/models";
import { chatLog } from "../root";
import { createMessage } from "~/factories";

export function handleAddChatInput(text: string, user: User) {
  const message = createMessage(text, user);
  chatLog.data.push(message);
}
