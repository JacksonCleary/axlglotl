import { type UserID } from "./user";

export interface IncomingUntranslatedMessage {
  messageID: string;
  timestamp: number;
  untranslatedMessage: string;
  userId: UserID;
}

export interface OutgoingTranslatedMessage extends IncomingUntranslatedMessage {
  translatedMessage: string;
  translatedTimestamp: number;
}

export interface ReceivedMessage extends OutgoingTranslatedMessage {
  timeReceived: number;
}

export interface ChatLog {
  data: Array<IncomingUntranslatedMessage>;
}

export const isMessageReceived = (
  message: OutgoingTranslatedMessage
): message is ReceivedMessage => "timeReceived" in message;
