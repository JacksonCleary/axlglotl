import React, {
  useState,
  useMemo,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  useApplicationSettings,
  UserPreferencesProvider,
  ShellContextProvider,
  type ShellContextProps,
} from "~/providers";
import Chat from "../chat/chat";

import { type AlertOptions, type User } from "~/models";
import { useRouter } from "next/router";
import { type UserSettings } from "~/models";
import { getRandomUntakenAvatarBGId } from "~/utils";
import { v4 as uuid } from "uuid";
export interface UserPreferences {
  updateUserSettings: Dispatch<SetStateAction<UserSettings>>;
  getUserSettings: () => UserSettings;
}

const Room: React.FC = () => {
  const applicationSettings = useApplicationSettings();
  const router = useRouter();
  const { query } = router;

  // TODO
  const defaultSidebarsOpen = false;

  // const [customUsername, setCustomUsername] = useState(
  //   applicationSettings.getUserSettings().customUsername
  // );
  const [customUsername, setCustomUsername] = useState("");
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(defaultSidebarsOpen);
  const [isRoomShareDialogOpen, setIsRoomShareDialogOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertOptions>("info");
  const [showAppBar, setShowAppBar] = useState(true);
  const [showRoomControls, setShowRoomControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [title, setTitle] = useState("");
  const [alertText, setAlertText] = useState("");
  const [roomId, setRoomId] = useState<string | undefined>(
    query.room as string
  );
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [isPeerListOpen, setIsPeerListOpen] = useState(defaultSidebarsOpen);
  const [peerList, setPeerList] = useState<User[]>([]);
  const [tabHasFocus, setTabHasFocus] = useState(true);

  const showAlert = useCallback<
    (message: string, severity?: AlertOptions) => void
  >((message, severity) => {
    setAlertText(message);
    setAlertSeverity(severity ?? "info");
    setIsAlertShowing(true);
  }, []);

  const shellContextValue: ShellContextProps = useMemo(
    () => ({
      tabHasFocus,
      setTabHasFocus,
      showRoomControls,
      setShowRoomControls,
      setTitle,
      showAlert,
      roomId,
      setRoomId,
      password,
      setPassword,
      peerList,
      setPeerList,
      customUsername,
      setCustomUsername,
    }),
    [
      tabHasFocus,
      setTabHasFocus,
      showRoomControls,
      setShowRoomControls,
      setTitle,
      showAlert,
      roomId,
      setRoomId,
      password,
      setPassword,
      peerList,
      setPeerList,
      customUsername,
      setCustomUsername,
    ]
  );

  // user settings
  // get random untaken avatarBG that can be changed later
  const randomAvatarBG = getRandomUntakenAvatarBGId(peerList);
  const [user, setUser] = useState<UserSettings>({
    userId: uuid(),
    customUsername: "",
    colorMode: "dark",
    playSoundOnNewMessage: true,
    showNotificationOnNewMessage: true,
    avatarID: randomAvatarBG,
  });

  const userPreferences: UserPreferences = useMemo(
    () => ({
      updateUserSettings: setUser,
      getUserSettings: () => user,
    }),
    [user, setUser]
  );

  // bail if we can't establish room TODO
  if (
    !roomId ||
    !applicationSettings?.fbdb ||
    !userPreferences?.getUserSettings
  ) {
    return null;
  }

  const { userId } = userPreferences.getUserSettings();
  console.log("userId", userId);
  return (
    <ShellContextProvider defaultStateOverride={shellContextValue}>
      <UserPreferencesProvider defaultStateOverride={userPreferences}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-950 to-slate-900">
          <div className="container flex h-full w-5/6 flex-col items-center justify-center border border-sky-500 p-4">
            <Chat
              userId={userId}
              appId={applicationSettings.fbdb}
              roomId={roomId}
            />
          </div>
        </main>
      </UserPreferencesProvider>
    </ShellContextProvider>
  );
};

export default Room;
