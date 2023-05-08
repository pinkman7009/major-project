/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import ClientApplicationList from "../components/client/applications/ApplicationList";
import LawyerApplicationList from "../components/lawyer/applications/ApplicationList";
import AuthContext from "../context/auth/authContext";

const applications = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  return (
    <>
      {user?.role === 0 ? <ClientApplicationList /> : <LawyerApplicationList />}
    </>
  );
};

export default applications;
