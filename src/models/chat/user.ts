export type UserName = string;
export type CustomUserName = string;
export type UserID = string;
export type User = {
  id: UserID;
  username: UserName;
  avatarID: Avatar;
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
