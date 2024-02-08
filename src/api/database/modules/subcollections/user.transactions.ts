import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { DB } from "../../../../config/firebase";
import { DD_Transaction } from "../../../../models/transaction";
import { setLoading } from "../../../../services/utils";

const COLLECTION = "transactions";
export const UserTransactions = {
  /**
   *
   * @param userId
   * @returns the transactions for the specified user
   */
  getUsertransactions: async (userId: string) => {
    setLoading(true);
    const snaps = await getDocs(
      collection(DB, "users", userId, COLLECTION)
    ).finally(() => setLoading(false));
    return snaps.docs.map((snap) => snap.data() as DD_Transaction);
  },
  /**
   *
   * @param userId id of the user
   * @param transaction whole transaction object to be created
   * @returns the created transaction
   */
  createUserTransaction: async (
    userId: string,
    transaction: DD_Transaction
  ) => {
    setLoading(true);
    try {
      setLoading(true);
      await setDoc(
        doc(DB, "users", userId, COLLECTION, transaction.id),
        transaction
      );
      return transaction;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  },
  /**
   *
   * @param userId id of the user
   * @param transaction whole transaction object to be updated
   * @returns the updated transaction
   */
  updateUserTransaction: async (
    userId: string,
    transaction: DD_Transaction
  ) => {
    setLoading(true);
    try {
      setLoading(true);
      await setDoc(
        doc(DB, "users", userId, COLLECTION, transaction.id),
        transaction,
        {
          merge: true,
        }
      );
      return transaction;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  },
  /**
   *
   * @param userId id of the user
   * @param transaction whole transaction object to be deleted
   * @returns void
   */
  deleteUserTransaction: async (
    userId: string,
    transaction: DD_Transaction
  ): Promise<void> => {
    setLoading(true);
    return deleteDoc(
      doc(DB, "users", userId, COLLECTION, transaction.id)
    ).finally(() => setLoading(false));
  },
};
