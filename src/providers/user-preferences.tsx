import React, {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type UserSettings } from "~/models";
export interface UserPreferences {
  updateUserSettings: Dispatch<SetStateAction<UserSettings>>;
  getUserSettings: () => UserSettings;
}

export let _userPreferences: UserPreferences = {
  updateUserSettings: () => {
    return;
  },
  getUserSettings: () => ({
    userId: "",
    customUsername: "",
    colorMode: "dark",
    playSoundOnNewMessage: true,
    showNotificationOnNewMessage: true,
    avatarID: "hexagons",
    typing: false,
  }),
};

const Context = createContext<UserPreferences>(_userPreferences);

export const useUserPreferences = (): UserPreferences => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesContext "
    );
  }

  return context;
};

export function getUserPreferences(): UserPreferences {
  return _userPreferences;
}
export interface UserPreferencesProviderProps {
  defaultStateOverride: UserPreferences;
  children?: React.ReactElement;
}

export const UserPreferencesProvider: React.FC<
  UserPreferencesProviderProps
> = ({ defaultStateOverride, children }) => {
  _userPreferences = defaultStateOverride;

  return (
    <Context.Provider value={_userPreferences}>{children}</Context.Provider>
  );
};

export const UserPreferencesContext = Context;
