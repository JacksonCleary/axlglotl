import React, { createContext, useContext, useState } from "react";

export interface ApplicationSettings {
  FBDB?: string;
}

let _applicationSettings: ApplicationSettings = {
  FBDB: "",
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
  defaultStateOverride?: ApplicationSettings;
  children?: React.ReactElement;
}

export const ApplicationSettingsProvider: React.FC<
  ApplicationSettingsProviderProps
> = ({ defaultStateOverride, children }) => {
  _applicationSettings = defaultStateOverride ?? {};
  const [state] = useState(_applicationSettings);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export const ApplicationSettingsContext = Context;
