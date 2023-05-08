import React, { useState, useEffect } from "react";
import ApplicationItem from "./ApplicationItem";
import Cookies from "js-cookie";
import axios from "axios";

const ApplicationList = () => {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = Cookies.get("token");
        const headers = {
          "x-auth-token": token,
        };

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applications/lawyer`,
          { headers }
        );
        setApplication(res.data);
      } catch (error) {}
    };

    fetchApplication();
  }, []);

  const pendingApplications = application?.filter(
    (item) => item.status === "Pending"
  );
  const acceptedApplications = application?.filter(
    (item) => item.status === "Accepted"
  );

  return (
    <div className="w-4/5 mx-auto">
      <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
        Pending Applications
      </h3>
      {pendingApplications?.length > 0 ? (
        pendingApplications?.map((item) => (
          <ApplicationItem key={item._id} application={item} />
        ))
      ) : (
        <p className="text-black">No pending applications</p>
      )}

      <hr />

      <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
        Accepted Applications
      </h3>
      {acceptedApplications?.length > 0 ? (
        acceptedApplications?.map((item) => (
          <ApplicationItem key={item._id} application={item} />
        ))
      ) : (
        <p className="text-black">No accepted applications</p>
      )}
    </div>
  );
};

export default ApplicationList;
