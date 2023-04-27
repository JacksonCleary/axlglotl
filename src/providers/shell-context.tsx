/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

import { type AlertOptions, type User } from "~/models";

export interface ShellContextProps {
  tabHasFocus: boolean;
  setTabHasFocus: Dispatch<SetStateAction<boolean>>;
  showRoomControls: boolean;
  setShowRoomControls: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  showAlert: (message: string, options?: AlertOptions) => void;
  roomId?: string;
  setRoomId: Dispatch<SetStateAction<string | undefined>>;
  password?: string;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  peerList: User[];
  setPeerList: Dispatch<SetStateAction<User[]>>;
  customUsername: string;
  setCustomUsername: Dispatch<SetStateAction<string>>;
}

const _shellContext: ShellContextProps = {
  tabHasFocus: true,
  setTabHasFocus: () => {},
  showRoomControls: false,
  setShowRoomControls: () => {},
  setTitle: () => {},
  showAlert: () => {},
  roomId: undefined,
  setRoomId: () => {},
  password: undefined,
  setPassword: () => {},
  peerList: [],
  setPeerList: () => {},
  customUsername: "",
  setCustomUsername: () => {},
};

export const ShellContext = createContext<ShellContextProps>(_shellContext);

export const useShellContext = (): ShellContextProps => {
  const context = useContext(ShellContext);
  if (!context) {
    throw new Error("useShellContext must be used within a ShellContext ");
  }

  return context;
};

export interface ShellContextProviderProps {
  defaultStateOverride: ShellContextProps;
  children?: React.ReactElement;
}

export const ShellContextProvider: React.FC<ShellContextProviderProps> = ({
  defaultStateOverride,
  children,
}) => {
  const _shellSettings = { ..._shellContext, ...defaultStateOverride };

  return (
    <ShellContext.Provider value={_shellSettings}>
      {children}
    </ShellContext.Provider>
  );
};
