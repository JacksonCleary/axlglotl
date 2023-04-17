import React from "react";
import { type User as UserModel } from "~/models";
import { getAvatarBGFromId } from "~/utils";

interface UserProps {
  user: UserModel;
  showName?: boolean;
  showAvatar?: boolean;
}

export const User: React.FC<UserProps> = ({
  user,
  showName = false,
  showAvatar = true,
}) => {
  const bgURL = showAvatar ? getAvatarBGFromId(user.avatarID) : "";
  const userName = user.customUsername || user.username;
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
      {showName && <p className="text-1xl text-[#f0f9ff]">{userName}</p>}
    </div>
  );
};
