import React from "react";
import { DashedButton } from "../../Buttons";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import ServiceList from "../../client/services/ServiceList";
import Link from "next/link";

const ApplicationItem = ({ application }) => {
  const { _id, applicant, category, service, date_created, problem, status } =
    application;

  const acceptClick = async () => {
    const token = Cookies.get("token");
    const headers = {
      "x-auth-token": token,
    };

    const req = {
      status: "Accepted",
    };

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${application._id}`,
      req,
      { headers }
    );

    application.status = "Accepted";
  };

  const deniedClick = async () => {
    const token = Cookies.get("token");
    const headers = {
      "x-auth-token": token,
    };

    const req = {
      status: "Denied",
    };

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${application._id}`,
      req,
      { headers }
    );

    application.status = "Denied";
  };

  return (
    <div className="rounded-lg border-2 bg-white p-3  text-black my-6 w-7/8">
      <div className="flex justify-around mx-auto">
        <div className="p-6 border-r-2 border-gray-30 w-1/3">
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Application ID:</p>
            <p className="text-right">{_id}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Client Name:</p>
            <p className="text-right">{applicant.name}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Category:</p>
            <p>{service?.name}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Date:</p>
            <p>{moment(date_created).format("DD-MM-YYYY")}</p>
          </div>
        </div>
        <div className="border-r-2 border-gray-300 p-6 w-1/3">
          <p className="font-bold text-primary mb-3">Description</p>

          <p>{problem}</p>
        </div>
        <div className="flex flex-col items-center p-6 w-1/3">
          {status === "Pending" ? (
            <div>
              <button
                className={`transition-all ease-in p-2 w-48
      text-green-500 my-3 text-sm rounded font-bold border-dashed border-2 border-green-500 hover:bg-green-500 hover:text-white flex justify-evenly items-center`}
                onClick={acceptClick}
              >
                <img src="accepted.svg" alt="accept" className="h-12" />
                Accept
              </button>

              <button
                className={`transition-all ease-in p-2 w-48 text-red-500 my-3 text-sm rounded font-bold border-dashed border-2 border-red-500 hover:bg-red-500 hover:text-white flex justify-evenly items-center`}
                onClick={deniedClick}
              >
                <img src="denied.svg" alt="accept" className="h-12" />
                Reject
              </button>
            </div>
          ) : (
            <>
              <Link href={`/chats/${applicant.name}`}>
                <button
                  className={`transition-all ease-in p-2 w-64 text-primary my-3 text-sm rounded font-bold border-dashed border-2 border-primary hover:bg-primary hover:text-white`}
                >
                  Go to Chat
                </button>
              </Link>
              <Link href={`/contract`}>
                <button
                  className={`transition-all ease-in p-2 w-64 text-primary my-3 text-sm rounded font-bold border-dashed border-2 border-primary hover:bg-primary hover:text-white`}
                >
                  Go to Contract
                </button>
              </Link>
              <DashedButton text="Close Application" size="large" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
