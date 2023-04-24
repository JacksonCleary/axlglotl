import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useApplicationSettings } from "~/providers";
import Chat from "../chat/chat";
import { ShellContextProvider } from "~/providers";
import { useShellContext, type ShellContextProps } from "~/providers";
import { type AlertOptions, type User } from "~/models";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// const DynamicChat = dynamic(() => import("~/components/chat/chat"), {
//   ssr: false,
// });

const Room: React.FC = () => {
  const applicationSettings = useApplicationSettings();
  const router = useRouter();
  const { query } = router;

  console.log(applicationSettings);

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

  // bail if we can't establish room TODO
  if (!roomId || !applicationSettings || !applicationSettings.fbdb) {
    return null;
  }

  const { userId } = applicationSettings.getUserSettings();
  console.log("userId", userId);
  return (
    <ShellContextProvider defaultStateOverride={shellContextValue}>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-950 to-slate-900">
        <div className="container flex w-5/6 flex-col items-center justify-center border border-sky-500 p-4 ">
          {peerList.map((user) => (
            <div key={user.id}>{user.id}</div>
          ))}
          <Chat
            userId={userId}
            appId={applicationSettings.fbdb}
            roomId={roomId}
          />
        </div>
      </main>
    </ShellContextProvider>
  );
};

export default Room;
