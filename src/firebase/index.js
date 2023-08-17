import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

/* Your web app's Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 */
const firebaseConfig = {
  apiKey: "AIzaSyCBm2E0lQOusTw3tJoUKLnOaEoa03JuBAU",
  authDomain: "bucketlist-app-f3273.firebaseapp.com",
  projectId: "bucketlist-app-f3273",
  storageBucket: "bucketlist-app-f3273.appspot.com",
  messagingSenderId: "103841708405",
  appId: "1:103841708405:web:2d9e49f6e48d0f95c43b3c"
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
