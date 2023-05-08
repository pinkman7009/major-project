import React, { useState, useEffect, useContext } from "react";
import ServiceItem from "./ServiceItem";
import { PrimaryButton } from "../../Buttons";
import Searchbar from "../../Searchbar";
import Modal from "../../Modal";
import AuthContext from "../../../context/auth/authContext";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";

const ServiceList = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [service, setService] = useState({
    name: "",
    description: "",
    cost: 0,
    tag: "",
  });
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const loaderStyles = css`
    margin: 2rem auto;
    border-color: "white";
  `;

  const onChange = (e) =>
    setService({ ...service, [e.target.name]: e.target.value });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/user`
      );

      setServices(res.data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchAllServices = async (input) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    setLoading(true);
    try {
      let res;

      if (input) {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services?input=${input}`
        );
      } else {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services`
        );
      }

      setServices(res.data);
      setLoading(false);
      setSearchText("");
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (user?.role === 1) fetchServices();
    if (user?.role === 0) fetchAllServices();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
        service,
        config
      );

      setModalOpen(false);

      fetchServices();
    } catch (error) {
      console.log({ error });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BeatLoader
          color={"#ffffff"}
          loading={loading}
          css={loaderStyles}
          size={30}
        />
      </div>
    );
    // return <h2 className="text-white font-bold">Loading...</h2>;
  }
  return (
    <div>
      <div className="w-4/5 mx-auto mt-12">
        <Searchbar
          text={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSubmit={() => fetchAllServices(searchText)}
        />
      </div>
      <div className="mt-12 mx-auto w-4/5">
        <div>
          {user?.role === 1 ? (
            <div className="flex justify-between items-center">
              {services.length < 0 ? (
                <h3 className="text-white font-bold">
                  You do not have any services now
                </h3>
              ) : (
                <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
                  Your Services
                </h3>
              )}
              <PrimaryButton
                text="Add Service"
                size="medium"
                handleClick={() => setModalOpen(true)}
              />
            </div>
          ) : (
            <>
              <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
                Services you might like
              </h3>
              <div className="rounded-t-md bg-white p-6 flex items-center justify-evenly w-4/5">
                <div className="text-lg text-primary border-b-primary border-b-2 font-bold cursor-pointer">
                  Best Matches
                </div>
                <div className="text-lg text-gray-500 font-bold cursor-pointer">
                  Most Demanded
                </div>
                <div className="text-lg text-gray-500 font-bold cursor-pointer">
                  Saved Services
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full">
          <div className="w-4/5">
            {services?.map((item) => (
              <ServiceItem key={item._id} service={item} />
            ))}
          </div>
          <div className="bg-white rounded-md text-black w-1/5 p-6 fixed right-0">
            <p className="text-primary font-bold text-xl">Filters</p>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Family Lawyer</p>
            </div>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Property Lawyer</p>
            </div>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Financial Lawyer</p>
            </div>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Criminal Lawyer</p>
            </div>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Business Lawyer</p>
            </div>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Civil Litigation Lawyer</p>
            </div>
            <div className="flex items-center my-3">
              <input type="checkbox" className="h-4 w-4 mr-6" />
              <p>Land Asset Lawyer</p>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          service={service}
          onChange={onChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ServiceList;
