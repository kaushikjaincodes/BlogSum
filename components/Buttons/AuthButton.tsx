"use client"
import React from "react";
import { useFormStatus } from "react-dom";
import './AuthButton.css'; 

const AuthButton= () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`auth-button ${pending ? 'loading' : 'active'}`}
    >
      {pending ? "Loading..." : "Sign in"}
    </button>
  );
};

export default AuthButton;
