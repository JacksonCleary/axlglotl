import { useShellContext, useUserPreferences } from "~/providers";

export const usePeerNameDisplay = () => {
  const { getUserSettings } = useUserPreferences();
  const { peerList } = useShellContext();

  const { userId: selfUserId, customUsername: selfCustomUsername } =
    getUserSettings();

  const isPeerSelf = (userId: string) => selfUserId === userId;

  const getPeerByUserId = (userId: string) =>
    peerList.find((peer) => peer.id === userId);

  const getPeerByPeerId = (peerId: string) =>
    peerList.find((peer) => peer.peerId === peerId);

  const getCustomUsername = (userId: string) =>
    isPeerSelf(userId)
      ? selfCustomUsername ?? ""
      : getPeerByUserId(userId)?.customUsername ?? "";

  const getFriendlyName = (userId: string) => {
    const customUsername = getCustomUsername(userId);
    const friendlyName = customUsername || userId.split("-")[0];
    return friendlyName;
  };

  const getDisplayUsername = (userId: string) => {
    const friendlyName = getFriendlyName(userId);

    return friendlyName;
  };

  return {
    getCustomUsername,
    isPeerSelf,
    getPeerByUserId,
    getPeerByPeerId,
    getFriendlyName,
    getDisplayUsername,
  };
};
