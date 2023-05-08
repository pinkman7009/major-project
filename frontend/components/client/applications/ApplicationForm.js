import axios from "axios";
import React, { useState, useEffect } from "react";
import { PrimaryButton, DashedButton } from "../../Buttons";
import { useRouter } from "next/router";
import moment from "moment";

const ApplicationForm = ({ id }) => {
  const [description, setDescription] = useState("");
  const [service, setService] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      problem: description,
      service: id,
      status: "Pending",
      lawyer: service.user._id,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications`,
        formData,
        config
      );

      router.push("/applications");
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    const fetchServiceDetails = async (id) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`
        );
        setService(res.data);
      } catch (error) {
        console.log({ error });
      }
    };

    if (id) fetchServiceDetails(id);
  }, []);

  if (!service) return <h3 className="text-primary">Loading...</h3>;
  return (
    <div className="text-black p-6 w-4/5 mx-auto">
      <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
        Submit an Application
      </h3>

      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center">
          <p className="text-primary font-bold mr-3 my-3">Service Name</p>
          <p className="text-black">{service.name}</p>
        </div>
        <div className="flex items-center">
          <p className="text-primary font-bold mr-3 my-3">Applicant's Name</p>
          <p className="text-black">Soumik Dalal</p>
        </div>
        <div className="flex items-center">
          <p className="text-primary font-bold mr-3 my-3">Lawyer's Name</p>
          <p className="text-black">{service.user.name}</p>
        </div>
        <div className="flex items-center">
          <p className="text-primary font-bold mr-3 my-3">Date</p>
          <p className="text-black">
            {moment(service.date_created).format("DD-MM-YYYY")}
          </p>
        </div>
        <p className="text-primary font-bold">Describe your problem here</p>
        <textarea
          className="my-6 h-80 p-3 w-full rounded-lg border-2 border-gray-300 text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <h3 className="text-xl text-purple-dark font-bold my-6">Attachments</h3>
      <p className="text-white font-semibold">
        Please attach a file related to the application if necessary.
      </p>
      <div className="flex w-full items-center justify-between my-3">
        <PrimaryButton text="Attach securely using IPFS" size="large" />
        <PrimaryButton
          text="Submit Application"
          size="large"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
