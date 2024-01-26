import { useUserStore } from "../stores/user";
import { AUTH } from "../config/firebase";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const Auth = {
  onAuthChange: async () =>
    new Promise((res, rej) => {
      onAuthStateChanged(AUTH, async (firebaseUser) => {
        useUserStore().setUser(firebaseUser);
        if (firebaseUser) {
          res(true);
        } else {
          rej(false);
        }
      });
    }),
  login: async () => {
    signInWithPopup(AUTH, googleProvider)
      .then(async (result) => {
        console.info(result);
      })
      .catch((error) => console.error(error));
  },
  logout: async () =>
    signOut(AUTH).then(() => {
      console.info("logout");
    }),
};
