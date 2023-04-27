import React from "react";
import { type UserID, type Avatar, type CustomUserName } from "~/models";
import { getAvatarBGFromId } from "~/utils";

interface UserProps {
  username: UserID | CustomUserName;
  avatarID: Avatar;
  showName?: boolean;
  showAvatar?: boolean;
}

export const User: React.FC<UserProps> = ({
  username,
  avatarID,
  showName = false,
  showAvatar = true,
}) => {
  const bgURL = showAvatar ? getAvatarBGFromId(avatarID) : "";
  return (
    <div className="flex items-center justify-center gap-3">
      {showAvatar && (
        <div
          className="h-[34px] w-[34px] rounded-full border border-sky-300 bg-sky-950"
          style={{
            backgroundImage: `url("${bgURL}")`,
            backgroundSize: 30,
          }}
        ></div>
      )}
      {showName && <p className="text-1xl text-sky-50">{username}</p>}
    </div>
  );
};
