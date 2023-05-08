import React, { useState, useEffect } from "react";
import ApplicationItem from "./ApplicationItem";
import axios from "axios";
import Cookies from "js-cookie";

const ApplicationList = () => {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      const token = Cookies.get("token");
      const headers = {
        "x-auth-token": token,
      };

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications/applicant`,
        { headers }
      );
      setApplication(res.data);
    };

    fetchApplication();
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
        Your Applications
      </h3>

      {application !== null &&
        application?.map((item) => (
          <ApplicationItem key={item._id} application={item} />
        ))}
    </div>
  );
};

export default ApplicationList;
