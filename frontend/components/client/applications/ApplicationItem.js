import React from "react";
import { DashedButton } from "../../Buttons";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import Link from "next/link";

const ApplicationItem = ({ application }) => {
  const { _id, lawyer, service, date_created, problem, status } = application;

  console.log({ application });

  const onCLick = async () => {
    const token = Cookies.get("token");
    const headers = {
      "x-auth-token": token,
    };

    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${_id}`,
      { headers }
    );
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
            <p className="font-bold text-primary">Lawyer Name:</p>
            <p className="text-right">{lawyer.name}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Service Name</p>
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
          <DashedButton
            text="Withdraw"
            size="large"
            type="button"
            handleClick={onCLick}
          >
            Withdraw
          </DashedButton>
          {status === "Pending" ? (
            <img src="pending.svg" alt="Pending" className="h-20" />
          ) : status === "Accepted" ? (
            <>
              <img src="accepted.svg" alt="Accepted" className="h-20" />
              <Link href={`/chats/${lawyer.name}`}>
                <button
                  className={`transition-all ease-in p-2 w-64 text-primary my-3 text-sm rounded font-bold border-dashed border-2 border-primary hover:bg-primary hover:text-white`}
                >
                  Go to Chat
                </button>
              </Link>
            </>
          ) : (
            <img src="denied.svg" alt="Denied" className="h-20" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
