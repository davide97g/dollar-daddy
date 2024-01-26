import { useUserStore } from "../stores/user";
import { AUTH } from "../config/firebase";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { API } from "../api";
import type { DD_User } from "../models/user";

const googleProvider = new GoogleAuthProvider();

export const Auth = {
  onAuthChange: async () =>
    new Promise((res, rej) => {
      onAuthStateChanged(AUTH, async (firebaseUser) => {
        if (firebaseUser) {
          const ddUser = await API.Database.Users.getById(firebaseUser.uid);
          if (ddUser) {
            useUserStore().setUser(ddUser);
            res(true);
          } else {
            const newUser: DD_User = {
              id: firebaseUser.uid,
              displayName: firebaseUser.displayName || "",
              email: firebaseUser.email || "",
            };
            const createdUser = await API.Database.Users.create(newUser);
            useUserStore().setUser(createdUser);
            res(!!createdUser);
          }
        } else {
          useUserStore().setUser(null);
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
