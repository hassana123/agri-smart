import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBZahw_3m3UG-Q6eCtn_peuNhZ4_wUTmsg",
  authDomain: "swift-a81b5.firebaseapp.com",
  projectId: "swift-a81b5",
  storageBucket: "swift-a81b5.appspot.com",
  messagingSenderId: "284986786150",
  appId: "1:284986786150:web:0dfbbf977b9a39ebeec8a7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
 export{auth, db, storage} 
