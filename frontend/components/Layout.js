import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import AuthContext from "../context/auth/authContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const token = Cookies.get("token");

  useEffect(() => {
    // if (!token) router.push("/login");
  }, [token]);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <>
      <Navbar />

      <main className="h-full text-white">{children}</main>
    </>
  );
};

export default Layout;
