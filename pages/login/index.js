import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth, logInWithEmailAndPassword, signInWithGoogle, logout } from "../../components/firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";

const index = () => {
  const [formData,setFormData]=useState({ email: '', password: '' })
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  const FromHandler=(event)=>{
    setFormData((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push('/');
  }, [user, loading]);

  // useEffect(() => {
  //   logout()
  // }, []);
  
  return (
    <>
      <div className="d-lg-flex half">
        <div className="bg order-1 order-md-2" style={{ backgroundImage: 'url("/images/bg_1.jpg")' }} />
        <div className="contents order-2 order-md-1">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="text-center">
                  <img src='/images/mylogo.png' height={80} />
                  <h3><strong>Login</strong></h3>
                  <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit</p>
                </div>
                <form onSubmit={(event)=>logInWithEmailAndPassword(event,formData.email,formData.password)}>
                  <div className="form-group first">
                    <label htmlFor="username">Username</label>
                    <input type="text" name='email' onChange={FromHandler} className="form-control" placeholder="your-email@gmail.com" id="username" />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={FromHandler} className="form-control" placeholder="Your Password" id="password" />
                  </div>
                  <div className="d-flex mb-5 align-items-center">
                    <span className="ml-auto"> <Link href="/reset" className="forgot-pass">Forgot Password</Link></span>
                  </div>
                  <input type="submit" defaultValue="Log In" style={{ background: "#FF4500" }} className="btn btn-block text-white" />
                </form>
                <div className="google-btn mt-2">
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                  </div>
                  <p className="btn-text" onClick={signInWithGoogle}><b>Sign in with google</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index

