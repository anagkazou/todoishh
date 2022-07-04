import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument, provider } from "_firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithRedirect } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const authUser = getAuth();

  const setDisplayName = (name) => {
    updateProfile(authUser.currentUser, {
      displayName: name,
    }).catch((error) => {
      // An error occurred
      // ...
    });
  };
  const signinWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((cred) => {
      setCurrentUser(cred.user);
      localStorage.setItem("userAuth", JSON.stringify(cred.user));
      navigate("/app/Inbox");
    });
  };

  const signupWithEmail = async ({ email, password, name }) => {
    //Todo: reutrn the function below and perform routing in signup component
    return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      setDisplayName(name);
      setCurrentUser({ ...cred.user, displayName: name });
      localStorage.setItem("userAuth", JSON.stringify(cred.user));
      navigate("/app/Inbox");
    });
  };

  const signinGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
        localStorage.setItem("userAuth", JSON.stringify(user));
        navigate("/app/Inbox");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ":", errorMessage);
      });
  };

  const signout = () => {
    const userAuth = getAuth();

    signOut(userAuth)
      .then(() => {
        setCurrentUser(null);
        localStorage.removeItem("userAuth");
      })
      .finally(() => navigate("/"));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      setLoading(false);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, (snapshot) => {
          const user = {
            ...snapshot.data(),
            id: snapshot.id,
          };
          setCurrentUser(user);

          localStorage.setItem("userAuth", JSON.stringify(user));
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   return !currentUser ? navigate("/") : null;
  // }, [currentUser]);
  const authValue = {
    currentUser,
    signupWithEmail,
    signinWithEmail,
    signinGoogle,
    signout,
  };

  return <AuthContext.Provider value={authValue}>{!loading && children}</AuthContext.Provider>;
};
export default AuthProvider;
