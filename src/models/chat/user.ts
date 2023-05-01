export type UserName = string;
export type CustomUserName = string;
export type UserID = string;
export type UserStatusCode = "ready" | "busy" | "typing" | "away";
export type UserStatusMessage = string;
export type User = {
  peerId: string;
  id: UserID;
  avatarID: Avatar;
  customUsername: CustomUserName;
  userStatusCode?: UserStatusCode;
  userStatusMessage?: UserStatusMessage;
  typing?: boolean;
};

export type Avatar =
  | "hexagons"
  | "charlie-brown"
  | "death-star"
  | "bamboo"
  | "bathroom-floor"
  | "cork-screw"
  | "brick-wall"
  | "diagonal-stripes"
  | "moroccan"
  | "morphing-diamonds"
  | "zig-zag"
  | "endless-clouds"
  | "overlapping-diamonds"
  | "unknown";

export interface UserSettings {
  colorMode: "dark" | "light";
  userId: string;
  customUsername: string;
  playSoundOnNewMessage: boolean;
  showNotificationOnNewMessage: boolean;
  avatarID: Avatar;
  typing: boolean;
}
