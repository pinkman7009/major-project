import React from "react";
import Login from "../components/auth/Login";

const login = () => {
  console.log({ api: process.env.NEXT_PUBLIC_API_URL });
  return (
    <>
      <Login />
    </>
  );
};

export default login;
