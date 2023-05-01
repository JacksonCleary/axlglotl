import React, { createContext, useContext } from "react";
import { getSettingsConstants } from "~/server/api/config";
export interface ApplicationSettings {
  fbdb?: string;
  messageTranscriptSizeLimit: number;
  messageCharacterSizeLimit: number;
  rtcConfig: RTCConfiguration;
}

const { messageTranscriptSizeLimit, messageCharacterSizeLimit, rtcConfig } =
  getSettingsConstants();

export let _applicationSettings: ApplicationSettings = {
  messageTranscriptSizeLimit: messageTranscriptSizeLimit,
  messageCharacterSizeLimit: messageCharacterSizeLimit,
  rtcConfig: rtcConfig,
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

  return (
    <Context.Provider value={_applicationSettings}>{children}</Context.Provider>
  );
};

export const ApplicationSettingsContext = Context;
