import { DB } from "../../../config/firebase";
import type { DD_User } from "../../../models/user";
import { setLoading } from "../../../services/utils";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { UserCategories } from "./subcollections/user.categories";
import { UserTransactions } from "./subcollections/user.transactions";

const COLLECTION = "users";
export const Users = {
  getById: async (id: string) => {
    setLoading(true);
    const snap = await getDoc(doc(DB, COLLECTION, id)).finally(() =>
      setLoading(false)
    );
    return snap.exists() ? (snap.data() as DD_User) : null;
  },
  create: async (user: DD_User): Promise<DD_User | null> => {
    try {
      setLoading(true);
      await setDoc(doc(DB, COLLECTION, user.id), user);
      return user;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  },
  update: async (user: DD_User): Promise<DD_User | null> => {
    try {
      setLoading(true);
      await setDoc(doc(DB, COLLECTION, user.id), user, {
        merge: true,
      });
      return user;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  },
  delete: async (user: DD_User): Promise<void> => {
    setLoading(true);
    return deleteDoc(doc(DB, COLLECTION, user.id)).finally(() =>
      setLoading(false)
    );
  },
  // ******** SUBCOLLECTIONS ****
  Categories: UserCategories,
  Transactions: UserTransactions,
};
