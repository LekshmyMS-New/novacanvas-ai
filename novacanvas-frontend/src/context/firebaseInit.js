
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_CONFIG } from "../utils";

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Helper functions
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logoutUser = () => signOut(auth);

// Listen for user changes
export const watchAuthState = (callback) => onAuthStateChanged(auth, callback);
