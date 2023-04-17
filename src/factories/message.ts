import { v4 as uuidv4 } from "uuid";
import {
  type IncomingUntranslatedMessage,
  type User,
  ERROR_TYPES,
} from "~/models";
import { throwError } from "~/actions";
export function createMessage(
  input: string,
  user: User
): IncomingUntranslatedMessage {
  if (!input || typeof input !== "string") {
    throwError(ERROR_TYPES.EMPTY_STRING);
  }

  const timestamp = new Date();
  const messageID = uuidv4();

  return {
    messageID,
    timestamp,
    user,
    untranslatedMessage: input,
  };
}
