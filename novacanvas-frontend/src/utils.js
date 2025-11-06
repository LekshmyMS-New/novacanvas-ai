
export const API_BASE = "http://localhost:5000/api"; 


export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAdDFS-atxorY6K7aGyR_5mc2Xg-5oYEEI",
  authDomain: "novacanvas-80e86.firebaseapp.com",
  projectId: "novacanvas-80e86",
  storageBucket: "novacanvas-80e86.firebasestorage.app",
  messagingSenderId: "1080651451865",
  appId: "1:1080651451865:web:baa1bea7a407719d7eddc8",
  // measurementId: "G-ZYXF8V47D0"
};


import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";


const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);


export const saveGeneratedImage = async (payload) => {
  try {
    const col = collection(db, "generatedImages");
    const docRef = await addDoc(col, payload);
    return { id: docRef.id };
  } catch (err) {
    console.error("Firebase save error:", err);
    throw err;
  }
};


export const fetchGallery = async () => {
  try {
    const col = collection(db, "generatedImages");
    const q = query(col, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Firebase fetch error:", err);
    return [];
  }
};
