import { type Room, type BaseRoomConfig } from "trystero";
import { joinRoom, type FirebaseRoomConfig } from "trystero/firebase";

export enum PeerHookType {
  NEW_PEER = "NEW_PEER",
}

export class PeerRoom {
  private room: Room;

  private roomConfig: BaseRoomConfig & FirebaseRoomConfig;

  private peerJoinHandlers: Map<
    PeerHookType,
    Parameters<Room["onPeerJoin"]>[0]
  > = new Map();

  private peerLeaveHandlers: Map<
    PeerHookType,
    Parameters<Room["onPeerLeave"]>[0]
  > = new Map();

  constructor(config: BaseRoomConfig & FirebaseRoomConfig, roomId: string) {
    this.roomConfig = config;
    this.room = joinRoom(this.roomConfig, roomId);

    this.room.onPeerJoin((...args) => {
      for (const [, peerJoinHandler] of this.peerJoinHandlers) {
        peerJoinHandler(...args);
      }
    });

    this.room.onPeerLeave((...args) => {
      for (const [, peerLeaveHandler] of this.peerLeaveHandlers) {
        peerLeaveHandler(...args);
      }
    });
  }

  flush = () => {
    this.onPeerJoinFlush();
    this.onPeerLeaveFlush();
  };

  leaveRoom = () => {
    this.room.leave();
    this.flush();
  };

  onPeerJoin = (
    peerHookType: PeerHookType,
    fn: Parameters<Room["onPeerJoin"]>[0]
  ) => {
    this.peerJoinHandlers.set(peerHookType, fn);
  };

  onPeerJoinFlush = () => {
    this.peerJoinHandlers = new Map();
  };

  onPeerLeave = (
    peerHookType: PeerHookType,
    fn: Parameters<Room["onPeerLeave"]>[0]
  ) => {
    this.peerLeaveHandlers.set(peerHookType, fn);
  };

  onPeerLeaveFlush = () => {
    this.peerLeaveHandlers = new Map();
  };

  getPeers = () => {
    const peers = this.room.getPeers();

    return Object.keys(peers);
  };

  makeAction = <T>(namespace: string) => {
    return this.room.makeAction<T>(namespace);
  };
}
