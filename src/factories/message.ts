import { v4 as uuidv4 } from "uuid";
import {
  type IncomingUntranslatedMessage,
  type UserID,
  ERROR_TYPES,
} from "~/models";
import { throwError } from "~/actions";
export function createMessage(
  input: string,
  userId: UserID
): IncomingUntranslatedMessage {
  if (!input || typeof input !== "string") {
    throwError(ERROR_TYPES.EMPTY_STRING);
  }

  const timestamp = Date.now();
  const messageID = uuidv4();

  return {
    messageID,
    timestamp,
    userId,
    untranslatedMessage: input,
  };
}
