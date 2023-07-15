import Home from "../components/Home/Home";
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, logout } from "../components/firebase/index";
import { query, collection, getDocs, where } from "firebase/firestore";

export default function Main() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useRouter();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("userId", "==", user?.uid));
      const doc = await getDocs(q);
      console.log(doc)
      // const data = doc.docs[0].data();
      // setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {return navigate.push("/")
    }else{ fetchUserName() }
    
  }, [user, loading]);

  return (
    <div>
      <Home />
      <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
    </div>

  );
}
