import { database } from "@/config/firebase";
import { TUser } from "./user.types";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserService = {
  async getUserById(uid: string): Promise<TUser | null> {
    const userRef = doc(database, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const user = {
        ...userSnapshot.data(),
      } as TUser;

      return user;
    }

    return null;
  },
  async setUserInfo(uid: string, data: Partial<TUser>): Promise<void> {
    const userRef = doc(database, "users", uid);
    await setDoc(userRef, data, { merge: true });
  },
};

export default UserService;
