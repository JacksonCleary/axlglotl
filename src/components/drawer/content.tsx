import React, { useState } from "react";
import { useShellContext, useUserPreferences } from "~/providers";
import { User } from "../users";
import { UserIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { User as UserModel } from "~/models";

interface DrawerContentProps {
  drawerOpen: boolean;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ drawerOpen }) => {
  const { getUserSettings } = useUserPreferences();
  const { userId, avatarID, typing } = getUserSettings();

  const shellContext = useShellContext();

  const { peerList } = shellContext;
  const userAlignClasses = "justify-start";
  const userDisplayClasses = `w-full ${userAlignClasses}`;
  const peersWidth = drawerOpen ? "w-3/6" : "w-full";
  const buttonSizingW = "w-5";
  const buttonSizingH = "h-5";

  const handleTypingStatus = (user: UserModel) => {
    if (user.typing) {
      return "bg-sky-700";
    }
    if (user.userStatusCode === "ready") {
      return "bg-emerald-700";
    }
    return "";
  };

  return (
    <div className="mt-10 flex flex-1 flex-col justify-between overflow-hidden">
      <div className={"flex-1"}>
        <div className={"p-2"}>
          <UserIcon
            className={`${buttonSizingW} ${buttonSizingH} fill-sky-50`}
          />
        </div>
        <div className={`flex justify-between rounded align-middle`}>
          <User
            userId={userId}
            avatarID={avatarID}
            showName={drawerOpen}
            className={userDisplayClasses}
          />
          {/* <h4 className={"font-mono text-4xl italic text-sky-50"}>You</h4> */}
        </div>
      </div>
      <div className={`h-2/5 ${peersWidth}`}>
        <div className={"p-2"}>
          <UserGroupIcon
            className={`${buttonSizingW} ${buttonSizingH} fill-sky-50`}
          />
        </div>
        {peerList.map((peer) => {
          const statusClasses = handleTypingStatus(peer);
          return (
            <div
              key={`drawer-user-${peer.id}`}
              className={`flex justify-between rounded align-middle ${statusClasses}`}
            >
              <User
                userId={peer.id}
                avatarID={peer.avatarID}
                showName={drawerOpen}
                className={`${userDisplayClasses} `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
