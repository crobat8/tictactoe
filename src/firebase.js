// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcxRGrE76zNcqgRxOlOBqCfhZG_nksezU",
  authDomain: "tictactoe-97a43.firebaseapp.com",
  databaseURL: "https://tictactoe-97a43-default-rtdb.firebaseio.com",
  projectId: "tictactoe-97a43",
  storageBucket: "tictactoe-97a43.appspot.com",
  messagingSenderId: "655535283194",
  appId: "1:655535283194:web:e139c89cf1ea472251e243",
  measurementId: "G-VMZBX49PYD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
