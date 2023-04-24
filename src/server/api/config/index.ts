import { type SettingsConstants } from "~/models";

export const getSettingsConstants = (): SettingsConstants => {
  return {
    fbdb: process.env.FIREBASE_DB || "",
    messageTranscriptSizeLimit: 10_000,
    messageCharacterSizeLimit: 150,
  };
};
