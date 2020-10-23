import { useMutation } from "@apollo/react-hooks";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React from "react";
import { CREATE_USER } from "./graphql/mutations";
import defaultUserImage from "./images/default-user-image.jpg";

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyBCh_4kfVCaGNZd0wc35Vgu98ghw6V5Py0",
  authDomain: "insta-react12-40d30.firebaseapp.com",
  databaseURL: "https://insta-react12-40d30.firebaseio.com",
  projectId: "insta-react12-40d30",
  storageBucket: "insta-react12-40d30.appspot.com",
  messagingSenderId: "498798690861",
  appId: "1:498798690861:web:eb397ee69ed991dc22eea4",
  measurementId: "G-0VETMGZBCY",
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({ status: "loading" });
  const [createUser] = useMutation(CREATE_USER);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on("value", async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  async function logInWithGoogle() {
    const data = await firebase.auth().signInWithPopup(provider);
    if(data.additionalUserInfo.isNewUser){
      const { uid, displayName, email} = data.user;
      const username = `${displayName.replace(/\s+/g, "")}${uid.slice(-5)}`
      const variables = {
        userId: uid,
        name: displayName,
        username,
        email,
        bio: "",
        website: "",
        profileImage: defaultUserImage,
        phoneNumber: "",
      };
      await createUser({ variables });
    }
  }

  async function logInWithEmailAndPassword(email, password){
    const data = await firebase.auth().signInWithEmailAndPassword(email, password);
    return data;
  }

  async function singUpWithEmailAndPassword(formData) {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password);
    if (data.additionalUserInfo.isNewUser) {
      const { uid, displayName, email} = data.user;
      const username = `${displayName.replace(/\s+/g, "")}${uid.slice(-5)}`
      const variables = {
        userId: uid,
        name: displayName,
        username,
        email,
        bio: "",
        website: "",
        profileImage: defaultUserImage,
        phoneNumber: "",
      };
      await createUser({ variables });
    }
  }

  async function signOut() {
    setAuthState({ status: "loading" });
    await firebase.auth().signOut();
    setAuthState({ status: "out" });
  }

  async function updateEmail(email){
    await authState.user.updateEmail(email);
    console.log(authState.user)
  }

  if (authState.status === "loading") {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          logInWithGoogle,
          logInWithEmailAndPassword,
          signOut,
          singUpWithEmailAndPassword,
          updateEmail
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
