import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  updatePassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChwuWv3zEc31ThRRvohWpglwip475pZVs",
  authDomain: "memoir-3116d.firebaseapp.com",
  databaseURL: "https://memoir-3116d-default-rtdb.firebaseio.com",
  projectId: "memoir-3116d",
  storageBucket: "memoir-3116d.appspot.com",
  messagingSenderId: "664158227218",
  appId: "1:664158227218:web:524b7274744352a54a01cb",
  measurementId: "G-KB7CG6EKW3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (event,email, password) => {
  event.preventDefault()
  try {
     await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (event,name, email, password) => {
  event.preventDefault()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name:name,
      authProvider: "local",
      email:user.email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const UpdatePassword = async (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword).then(() => {
    alert("Update Password Successfully")
  }).catch((error) => {
   alert("Something Want Wrong")
  });
  
}

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  UpdatePassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};