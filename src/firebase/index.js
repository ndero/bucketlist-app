import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

/* Your web app's Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 */
const firebaseConfig = {
  apiKey: "AIzaSyD_JIB8m-OCcuswJ6ttd0_WXlPikjAgtaw",
  authDomain: "bucketlist-api-e97b3.firebaseapp.com",
  projectId: "bucketlist-api-e97b3",
  storageBucket: "bucketlist-api-e97b3.appspot.com",
  messagingSenderId: "780709962569",
  appId: "1:780709962569:web:df077834b0cd4603453098",
  measurementId: "G-55EPSGWT6W",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const postItem = async (ref, data) => {
  return await addDoc(ref, data);
};

export const patchItem = async (ref, data) => {
  return await updateDoc(ref, data);
};

export const deleteItem = async (ref) => {
  return await deleteDoc(ref);
};
