export type UserName = string;
export type CustomUserName = string;
export type UserID = string;
export type User = {
  id: UserID;
  avatarID?: Avatar | undefined;
  customUsername?: CustomUserName;
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
  | "overlapping-diamonds";

export interface UserSettings {
  colorMode: "dark" | "light";
  userId: string;
  customUsername: string;
  playSoundOnNewMessage: boolean;
  showNotificationOnNewMessage: boolean;
}
