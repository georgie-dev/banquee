import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBuJaT782V0pTR0ROIc76N1KfE2nJ9hLw0",
  authDomain: "banquee-2e49e.firebaseapp.com",
  projectId: "banquee-2e49e",
  storageBucket: "banquee-2e49e.appspot.com",
  messagingSenderId: "705029991915",
  appId: "1:705029991915:web:7677ecc2b9d6a68ef9bdae",
  databaseURL: "https://banquee-2e49e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db}
