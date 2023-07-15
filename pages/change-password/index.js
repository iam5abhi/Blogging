import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, UpdatePassword } from "../../components/firebase/index";


function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate.push("/login");
  }, [user, loading]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          type="button"
          onClick={() => UpdatePassword(email)}
        >
          Update password
        </button>
        <div>
        <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
export default Reset;