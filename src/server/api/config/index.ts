import { SettingsConstants } from "~/server/models";

export const getSettingsConstants = (): SettingsConstants => {
  return {
    fbdb: process.env.FIREBASE_DB || "",
  };
};
