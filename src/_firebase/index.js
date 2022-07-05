import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc, writeBatch } from "firebase/firestore";
import { generatePushId } from "utils";
import { icebreakerTasks } from "./icebreakerTasks";

const initConfig = {
  apiKey: "AIzaSyCACofwubevtI5Y6rxyk1f-ubGzAhd7hXA",
  authDomain: "kairos-40291.firebaseapp.com",
  projectId: "kairos-40291",
  storageBucket: "kairos-40291.appspot.com",
  messagingSenderId: "387377000468",
  appId: "1:387377000468:web:ad0a46f02372c7f916b701",
  measurementId: "G-Z4LT56MYQ8",
};

const firebaseConfig = initializeApp({
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
  const icebreakerProjectId = "welcome";
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
    setDoc(projectsDocRef, icebreakerProject).then(() => {
      let batch = writeBatch(db);
      while (icebreakerTasks.length) {
        const id = generatePushId();
        batch.set(doc(db, "user", `${userId}/tasks/${id}`), icebreakerTasks.pop());
        if (!icebreakerTasks.length) {
          batch.commit();
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    setDoc(userRef, { displayName, createdAt, email })
      .finally(() => batchWriteIcebreakerTasks(userAuth.uid))
      .catch((err) => console.log(err));
  }
  return userRef;
};
