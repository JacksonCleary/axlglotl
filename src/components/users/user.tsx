import React from "react";
import { type UserID, type Avatar, type CustomUserName } from "~/models";
import { getAvatarBGFromId } from "~/utils";
import { usePeerNameDisplay } from "~/hooks";
import Image from "next/image";

interface UserProps {
  userId: UserID;
  avatarID: Avatar;
  showName?: boolean;
  showAvatar?: boolean;
  size?: number;
  className?: string;
}

export const User: React.FC<UserProps> = ({
  userId,
  avatarID,
  showName = false,
  showAvatar = true,
  size = 9,
  className = "",
}) => {
  const { getDisplayUsername } = usePeerNameDisplay();
  const name = getDisplayUsername(userId);
  const bgURL = showAvatar ? getAvatarBGFromId(avatarID) : "";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showAvatar && (
        <Image
          className={`h-${size} w-${size} rounded-full border border-sky-300 bg-sky-950`}
          alt={`Avatar for User: ${userId}`}
          width={size}
          height={size}
          src={bgURL}
        />

        // <img
        //   className={`h-${size} w-${size} rounded-full border border-sky-300 bg-sky-950`}
        //   // style={{
        //   //   backgroundImage: `url("${bgURL}")`,
        //   //   backgroundSize: 30,
        //   // }}
        //   alt={`Avatar for User: ${userId}`}
        // ></img>
      )}
      {showName && <p className="text-1xl text-sky-50">{name}</p>}
    </div>
  );
};
