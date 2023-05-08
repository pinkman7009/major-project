/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";

const lawyerLinks = (user, logout) => {
  const router = useRouter();
  return (
    <>
      <Link href="/applications">
        <li className="cursor-pointer transition-all w-32 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Applications
        </li>
      </Link>
      <div className="relative group">
        <button>
          <span className="font-bold">LegalAI</span>
        </button>
        <div className="absolute z-10 hidden bg-grey-200 group-hover:block">
          <div className=" bg-white rounded-md shadow-lg text-sm text-primary font-bold">
            <Link href="/summarizer">
              <p className="cursor-pointer p-2 hover:text-white hover:bg-primary transition-all ease-in">
                Summarizer
              </p>
            </Link>
            <Link href="/analyzer">
              <p className="cursor-pointer p-2 hover:bg-primary hover:text-white transition-all ease-in">
                Analyzer
              </p>
            </Link>
          </div>
        </div>
      </div>
      {/* <Link href="/services">
        <li className="cursor-pointer transition-all w-28 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Services
        </li>
      </Link>
      <Link href={`/chats/${user?.name}`}>
        <li className="cursor-pointer transition-all w-28 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Chats
        </li>
      </Link> */}
      <div className="relative group">
        <button>
          <span className="font-bold">Hi, {user?.name}</span>
        </button>
        <div className="absolute z-10 hidden bg-grey-200 group-hover:block">
          <div className=" bg-white rounded-md shadow-lg text-sm text-primary font-bold">
            <p
              className="cursor-pointer p-2 hover:bg-primary hover:text-white transition-all ease-in"
              onClick={() => {
                logout();

                router.push("/login");
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const clientLinks = (user, logout) => {
  const router = useRouter();
  return (
    <>
      <Link href="/">
        <li className="cursor-pointer transition-all w-28 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Home
        </li>
      </Link>
      <Link href="/applications">
        <li className="cursor-pointer transition-all w-32 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Applications
        </li>
      </Link>
      <div className="relative group">
        <button>
          <span className="font-bold">LegalAI</span>
        </button>
        <div className="absolute z-10 hidden bg-grey-200 group-hover:block">
          <div className=" bg-white rounded-md shadow-lg text-sm text-primary font-bold">
            <Link href="/summarizer">
              <p className="cursor-pointer p-2 hover:text-white hover:bg-primary transition-all ease-in">
                Summarizer
              </p>
            </Link>
            <Link href="/analyzer">
              <p className="cursor-pointer p-2 hover:bg-primary hover:text-white transition-all ease-in">
                Analyzer
              </p>
            </Link>
          </div>
        </div>
      </div>

      <Link href="/services">
        <li className="cursor-pointer transition-all w-28 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Services
        </li>
      </Link>
      <Link href={`/chats/${user?.name}`}>
        <li className="cursor-pointer transition-all w-28 rounded-full p-3 ease-in-out font-bold flex justify-center items-center hover:bg-white hover:text-black">
          Chats
        </li>
      </Link>
      <div className="relative group">
        <button>
          <span className="font-bold">Hi, {user?.name}</span>
        </button>
        <div className="absolute z-10 hidden bg-grey-200 group-hover:block">
          <div className=" bg-white rounded-md shadow-lg text-sm text-primary font-bold">
            <p
              className="cursor-pointer p-2 hover:bg-primary hover:text-white transition-all ease-in"
              onClick={() => {
                logout();

                router.push("/login");
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { user, logout } = authContext;
  return (
    <div className="flex justify-between items-center bg-bgPrimary p-6 text-white">
      <h2 className="text-[2.5rem] font-bold text-primary">LawBuddy</h2>

      <ul className="flex justify-between items-center w-1/2">
        {user?.role === 0
          ? clientLinks(user, logout)
          : lawyerLinks(user, logout)}
      </ul>
    </div>
  );
};

export default Navbar;
