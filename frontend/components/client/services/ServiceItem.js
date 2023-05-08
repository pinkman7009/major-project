import React, { useContext, useEffect } from "react";
import { PrimaryButton } from "../../Buttons";
import Link from "next/link";
import moment from "moment";
import Tags from "../../Tags";
import AuthContext from "../../../context/auth/authContext";

const ServiceItem = ({ service }) => {
  const { _id, cost, name, description, date, tag } = service;

  const stars = 4;

  const authContext = useContext(AuthContext);

  const { user } = authContext;
  return (
    <div className="border-2 bg-white text-black p-3">
      <div className="flex justify-between mx-auto">
        <div className="p-6 border-r-2 border-gray-30 w-1/3">
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Service Name</p>
            <p className="text-right">{name}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Lawyer Name:</p>
            <p className="text-right">{service.user.name}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Date Posted:</p>
            <p>{moment(date).format("DD-MM-YYYY")}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Experience</p>
            <p>3 years</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Success Rate</p>
            <p>65%</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-primary">Ratings</p>
            <div className="flex items-center">
              {[...Array(stars)].map((item) => {
                return <img src="star.svg" alt="" />;
              })}
            </div>
          </div>
          {tag && <Tags title={tag.title} />}
        </div>
        <div className="border-r-2 border-gray-300 p-6 w-1/3">
          <p className="font-bold text-primary mb-3">Description</p>

          <p>{description}</p>
        </div>
        <div className="flex flex-col items-center p-6 w-1/3">
          <p>Average Cost estimation</p>
          <p className="text-2xl font-bold">₹{cost}</p>

          {user?.role === 1 ? (
            <button
              className={` transition-all ease-in p-2 w-64 text-white my-3 text-sm rounded font-bold bg-primary hover:opacity-80`}
            >
              View Applications
            </button>
          ) : (
            <Link href={`/services/${_id}`}>
              <button
                className={` transition-all ease-in p-2 w-64 text-white my-3 text-sm rounded font-bold bg-primary hover:opacity-80`}
              >
                Submit Application
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
