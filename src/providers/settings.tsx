import React, { createContext, useContext, useState } from "react";
import { type UserSettings } from "~/models";
import { getSettingsConstants } from "~/server/api/config";
import { v4 as uuid } from "uuid";
export interface ApplicationSettings {
  fbdb?: string;
  messageTranscriptSizeLimit: number;
  messageCharacterSizeLimit: number;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<void>;
  getUserSettings: () => UserSettings;
}

const { messageTranscriptSizeLimit, messageCharacterSizeLimit } =
  getSettingsConstants();

export let _applicationSettings: ApplicationSettings = {
  messageTranscriptSizeLimit: messageTranscriptSizeLimit,
  messageCharacterSizeLimit: messageCharacterSizeLimit,
  updateUserSettings: () => Promise.resolve(),
  getUserSettings: () => ({
    userId: uuid(),
    customUsername: "",
    colorMode: "dark",
    playSoundOnNewMessage: true,
    showNotificationOnNewMessage: true,
  }),
};

const Context = createContext<ApplicationSettings>(_applicationSettings);

export const useApplicationSettings = (): ApplicationSettings => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useApplicationSettings must be used within a ApplicationSettingsContext "
    );
  }

  return context;
};

export function getApplicationSettings(): ApplicationSettings {
  return _applicationSettings;
}
export interface ApplicationSettingsProviderProps {
  defaultStateOverride: ApplicationSettings;
  children?: React.ReactElement;
}

export const ApplicationSettingsProvider: React.FC<
  ApplicationSettingsProviderProps
> = ({ defaultStateOverride, children }) => {
  _applicationSettings = defaultStateOverride;
  const [state] = useState(_applicationSettings);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export const ApplicationSettingsContext = Context;
