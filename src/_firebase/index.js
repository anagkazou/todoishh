import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = initializeApp({
  //   apiKey: 'AIzaSyCACofwubevtI5Y6rxyk1f-ubGzAhd7hXA',
  //   authDomain: process.env.AUTH_DOMAIN,
  //   databaseURL: process.env.DATABASE_URL,
  //   projectId: process.env.PROJECT_ID,
  //   storageBucket: process.env.STORAGE_BUCKET,
  //   messagingSenderId: process.env.MESSAGING_SENDER_ID,
  //   appId: process.env.APP_ID,
  apiKey: "AIzaSyCACofwubevtI5Y6rxyk1f-ubGzAhd7hXA",
  authDomain: "kairos-40291.firebaseapp.com",
  projectId: "kairos-40291",
  storageBucket: "kairos-40291.appspot.com",
  messagingSenderId: "387377000468",
  appId: "1:387377000468:web:ad0a46f02372c7f916b701",
  measurementId: "G-Z4LT56MYQ8",
});
export const auth = getAuth(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(firebaseConfig);
export { firebaseConfig as firebase };
export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    console.log("Doc data:", userSnapshot.data());

    try {
      await setDoc(userRef, { displayName, createdAt, email });
    } catch (error) {
      console.log("Error creating user :", error.message);
    }
  }
  return userRef;
};
