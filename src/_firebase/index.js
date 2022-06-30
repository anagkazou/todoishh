import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { generatePushId } from "utils";
import { collection } from "firebase/firestore";
import { icebreakerTasks } from "./icebreakerTasks";

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

export const batchWriteIcebreakerTasks = async (userId) => {
  const icebreakerProjectId = "00000abc";
  try {
    const icebreakerProject = {
      name: "Welcome 👋",
      projectId: icebreakerProjectId,
      projectColour: {
        name: "Charcoal",
        hex: "#808080",
      },
      projectIsList: true,
    };
    const projectsDocRef = doc(collection(db, "user", `${userId}/projects`));
    setDoc(projectsDocRef, icebreakerProject);
    // .then(() => {
    //   setProjects({ ...newProject });
    // });
  } catch (error) {
    console.log(error);
  }

  let batch = writeBatch(db);
  while (icebreakerTasks.length) {
    //batch.set(collection(db, "user", `${userId}/tasks/${Math.random().toString(36).substring(2, 15)}`), icebreakerTasks.pop());
    batch.set(doc(db, "user", `${userId}/tasks/${Math.random().toString(36).substring(2, 15)}`), icebreakerTasks.pop());
    if (!icebreakerTasks.length) {
      await batch.commit();
    }
  }
};

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    batchWriteIcebreakerTasks(userAuth.uid)

    try {
      await setDoc(userRef, { displayName, createdAt, email });
    } catch (error) {
      console.log("Error creating user :", error.message);
    }
  }
  return userRef;
};
