import type { DD_Category } from "src/models/categories";
import { DB } from "../../../config/firebase";
import type { DD_User } from "../../../models/user";
import { setLoading } from "../../../services/utils";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { DD_Tag } from "src/models/tag";
import { DD_Transaction } from "src/models/transaction";
import { DD_Stats } from "src/models/stats";

const COLLECTION = "users";
export const Users = {
  getById: async (id: string) => {
    setLoading(true);
    const snap = await getDoc(doc(DB, COLLECTION, id)).finally(() =>
      setLoading(false)
    );
    return snap.exists() ? (snap.data() as DD_User) : null;
  },
  getUserCategories: async (id: string) => {
    setLoading(true);
    const snaps = await getDocs(
      collection(DB, COLLECTION, id, "categories")
    ).finally(() => setLoading(false));
    return snaps.docs.map((snap) => snap.data() as DD_Category);
  },
  getUserTags: async (id: string) => {
    setLoading(true);
    const snaps = await getDocs(collection(DB, COLLECTION, id, "tags")).finally(
      () => setLoading(false)
    );
    return snaps.docs.map((snap) => snap.data() as DD_Tag);
  },
  getUserTransactions: async (id: string) => {
    setLoading(true);
    const snaps = await getDocs(
      collection(DB, COLLECTION, id, "transactions")
    ).finally(() => setLoading(false));
    return snaps.docs.map((snap) => snap.data() as DD_Transaction);
  },
  getUserRecurrencies: async (id: string) => {
    setLoading(true);
    const snaps = await getDocs(
      collection(DB, COLLECTION, id, "recurrencies")
    ).finally(() => setLoading(false));
    return snaps.docs.map((snap) => snap.data() as DD_Transaction);
  },
  getUserStats: async (id: string) => {
    setLoading(true);
    const snaps = await getDocs(
      collection(DB, COLLECTION, id, "stats")
    ).finally(() => setLoading(false));
    return snaps.docs.map((snap) => snap.data() as DD_Stats);
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
};
