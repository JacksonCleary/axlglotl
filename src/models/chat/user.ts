export type UserName = string;
export type CustomUserName = string;
export type UserID = string;
export type User = {
  id: UserID;
  username: UserName;
  customUsername?: CustomUserName;
};
