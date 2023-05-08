import React, { useContext, useState, useEffect } from "react";
import { PrimaryButton } from "../Buttons";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { register, isAuthenticated } = authContext;

  const [isLawyer, setIsLawyer] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: 1,
    barID: null,
  });

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    register(user);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex justify-center items-center bg-secondary">
      <div className="w-3/4 p-6 flex flex-col items-center mt-6">
        <div className="bg-white rounded-lg p-6 shadow-2xl h-auto w-1/2 mt-12 flex flex-col items-center justify-between">
          <h1 className="text-primary font-bold text-3xl">LawBuddy</h1>
          <input
            name="name"
            type="text"
            className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
            placeholder="Name"
            onChange={onChange}
          />
          <input
            name="email"
            type="email"
            className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
            placeholder="Email"
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
            placeholder="Password"
            onChange={onChange}
          />
          <input
            name="phone_number"
            type="text"
            className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
            placeholder="Phone no."
            onChange={onChange}
          />
          <div className="flex justify-between items-center w-4/5">
            <div className="flex justify-between items-center">
               {" "}
              <input
                type="radio"
                id="lawyer"
                name="role"
                value="Lawyer"
                onChange={() => {
                  setIsLawyer(true);

                  setUser((user) => {
                    return { ...user, role: 1 };
                  });
                }}
              />
               {" "}
              <label htmlFor="lawyer" className="m-6">
                Lawyer
              </label>
               {" "}
            </div>
            <div className="flex justify-between items-center">
              <input
                type="radio"
                id="client"
                name="role"
                value="Client"
                onChange={() => {
                  setIsLawyer(false);

                  setUser((user) => {
                    return { ...user, role: 0 };
                  });
                }}
              />
              <label htmlFor="client" className="m-6">
                Client
              </label>
               {" "}
            </div>
          </div>
          {isLawyer && (
            <div>
              <p className="text-white font-bold">
                If Lawyer, provide BAR council ID
              </p>{" "}
              <input
                name="barID"
                type="text"
                className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
                placeholder="BAR Council ID"
                onChange={onChange}
              />
            </div>
          )}
          <PrimaryButton text="Register" size="large" handleClick={onSubmit} />
          <p className="text-primary">or</p>
          <Link href="/login">
            <p className="text-primary font-bold cursor-pointer transition-all ease-in hover:border-b-2 hover:border-primary">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
