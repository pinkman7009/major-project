/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import Form from "../../components/client/applications/ApplicationForm";

const application = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Form id={id} />
    </>
  );
};

export default application;
