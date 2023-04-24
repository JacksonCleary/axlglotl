import { useState } from "react";

import { type PeerRoom } from "~/services/PeerRoom";
import { type PeerActions } from "~/models";

export function usePeerRoomAction<T>(peerRoom: PeerRoom, action: PeerActions) {
  const [peerRoomAction] = useState(() => peerRoom.makeAction<T>(action));

  return peerRoomAction;
}
