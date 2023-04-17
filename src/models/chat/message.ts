import { type User } from "./user";

export interface IncomingUntranslatedMessage {
  messageID: string;
  timestamp: Date;
  untranslatedMessage: string;
  user: User;
}

export interface OutgoingTranslatedMessage extends IncomingUntranslatedMessage {
  translatedMessage?: string;
}

export interface ChatLog {
  data: Array<IncomingUntranslatedMessage>;
}
