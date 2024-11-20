import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
   
  const name =useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
   
    
    console.log(email.current.value);
    console.log(password.current.value);
     const message = checkValidData(email.current.value, password.current.value);
setErrorMessage(message);

if(message) return;

if(!isSignInForm){
  //Sign Up Logic
  createUserWithEmailAndPassword(
    auth, 
    email.current.value, 
    password.current.value
  )

  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log (user);
      navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   setErrorMessage(errorCode+"~" +errorMessage)
  });
}else {
  //Signin /SignUp
  signInWithEmailAndPassword(
    auth, 
    email.current.value, 
    password.current.value
  )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage (errorCode+ " " +errorMessage);
  });

}
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/US-en-20241104-TRIFECTA-perspective_3f9119c8-336a-434d-aaaa-2deac24bc220_large.jpg"
          alt="logo"
        />
      </div>

      <form 
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
          ref={email}  // Attach ref for email input
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
          ref={password}  // Attach ref for password input
        />
        <p className="text-red-500">{errorMessage}</p>

        <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p 
          className="py-4 cursor-pointer" 
          onClick={toggleSignInForm}
        >
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
  
};

export default Login;
