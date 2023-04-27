/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

export interface MessagingContextProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onSubmit: (message: string) => Promise<void>;
  onEmoji: () => Promise<void>;
  resetInput: () => void;
}

const _messagingContext: MessagingContextProps = {
  text: "",
  setText: () => {},
  onSubmit: async () => {},
  onEmoji: async () => {},
  resetInput: () => {},
};

export const MessagingContext =
  createContext<MessagingContextProps>(_messagingContext);

export const useMessagingContext = (): MessagingContextProps => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error(
      "useMessagingContext must be used within a MessagingContext "
    );
  }

  return context;
};

export interface MessagingContextProviderProps {
  defaultStateOverride: MessagingContextProps;
  children?: React.ReactElement;
}

export const MessagingContextProvider: React.FC<
  MessagingContextProviderProps
> = ({ defaultStateOverride, children }) => {
  const _shellSettings = { ..._messagingContext, ...defaultStateOverride };

  return (
    <MessagingContext.Provider value={_shellSettings}>
      {children}
    </MessagingContext.Provider>
  );
};
