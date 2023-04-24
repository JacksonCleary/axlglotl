import { getApplicationSettings, useShellContext } from "~/providers";

export const usePeerNameDisplay = () => {
  const { getUserSettings } = getApplicationSettings();
  const { peerList, customUsername: selfCustomUsername } = useShellContext();

  const { userId: selfUserId } = getUserSettings();

  const isPeerSelf = (userId: string) => selfUserId === userId;

  const getPeer = (userId: string) =>
    peerList.find((peer) => peer.id === userId);

  const getCustomUsername = (userId: string) =>
    isPeerSelf(userId)
      ? selfCustomUsername
      : getPeer(userId)?.customUsername ?? "";

  const getFriendlyName = (userId: string) => {
    const customUsername = getCustomUsername(userId);
    const friendlyName = customUsername || userId;

    return friendlyName;
  };

  const getDisplayUsername = (userId: string) => {
    const friendlyName = getFriendlyName(userId);
    const customUsername = getCustomUsername(userId);

    let displayUsername: string;

    if (customUsername === friendlyName) {
      displayUsername = `${friendlyName} (${userId})`;
    } else {
      displayUsername = userId;
    }

    return displayUsername;
  };

  return {
    getCustomUsername,
    isPeerSelf,
    getFriendlyName,
    getDisplayUsername,
  };
};
