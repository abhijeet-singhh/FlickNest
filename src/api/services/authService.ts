import { signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.ts";

type FirebaseUser = Pick<User, "uid" | "displayName" | "email" | "photoURL">;

export const loginWithGoogle = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  } catch (error) {
    console.error("Google Sign-In failed:", error);
    throw error;
  }
};
//This function returns the cleaned user data — no raw Firebase objects in Redux.