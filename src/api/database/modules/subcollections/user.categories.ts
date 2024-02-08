import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { DB } from "../../../../config/firebase";
import { DD_Category } from "../../../../models/categories";
import { setLoading } from "../../../../services/utils";

const COLLECTION = "categories";
export const UserCategories = {
  /**
   *
   * @param userId
   * @returns the categories for the specified user
   */
  getUserCategories: async (userId: string) => {
    setLoading(true);
    const snaps = await getDocs(
      collection(DB, "users", userId, COLLECTION)
    ).finally(() => setLoading(false));
    return snaps.docs.map((snap) => snap.data() as DD_Category);
  },
  /**
   *
   * @param userId id of the user
   * @param category whole category object to be created
   * @returns the created category
   */
  createUserCategory: async (userId: string, category: DD_Category) => {
    setLoading(true);
    try {
      setLoading(true);
      await setDoc(doc(DB, "users", userId, COLLECTION, category.id), category);
      return category;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  },
  /**
   *
   * @param userId id of the user
   * @param category whole category object to be updated
   * @returns the updated category
   */
  updateUserCategory: async (userId: string, category: DD_Category) => {
    setLoading(true);
    try {
      setLoading(true);
      await setDoc(
        doc(DB, "users", userId, COLLECTION, category.id),
        category,
        {
          merge: true,
        }
      );
      return category;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  },
  /**
   *
   * @param userId id of the user
   * @param category whole category object to be deleted
   * @returns void
   */
  deleteUserCategory: async (
    userId: string,
    category: DD_Category
  ): Promise<void> => {
    setLoading(true);
    return deleteDoc(doc(DB, "users", userId, COLLECTION, category.id)).finally(
      () => setLoading(false)
    );
  },
};
