import { database } from "@/config/firebase";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { TRoom, TRoomCreatePayload, TRoomUpdatePayload } from "./room.types";

const RoomService = {
  async create(payload: TRoomCreatePayload): Promise<void> {
    const roomsRef = collection(database, "rooms");

    await addDoc(roomsRef, {
      uid: payload.uid,
      name: payload.name,
      createdAt: Timestamp.now(),
    });
  },
  async update(id: string, payload: TRoomUpdatePayload): Promise<void> {
    const roomRef = doc(database, "rooms", id);
    await updateDoc(roomRef, payload);
  },
  async findAll(uid: string): Promise<TRoom[]> {
    const roomsRef = collection(database, "rooms");
    const queryRef = query(
      roomsRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(queryRef);
    const rooms = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as TRoom;
    });

    return rooms;
  },
  async findOneSnapshot(
    id: string,
    callback: (room: TRoom | null) => void
  ): Promise<() => void> {
    const roomRef = doc(database, "rooms", id);
    const unsubscribe = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({
          id: docSnap.id,
          ...docSnap.data(),
        } as TRoom);
      } else {
        callback(null);
      }
    });

    return unsubscribe;
  },
};

export default RoomService;
