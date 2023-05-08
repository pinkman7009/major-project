import React, { useState } from "react";
import { PrimaryButton } from "./Buttons";
import { create } from "ipfs-http-client";

const Contract = () => {
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  const [buffer, setBuffer] = useState(null);
  const [output, setOutput] = useState(null);

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      await setBuffer(Buffer(reader.result));
      console.log("buffer", buffer);
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await ipfs.add(buffer);
    console.log(result);
    setOutput(result);
  };

  return (
    <div className="mt-12 flex justify-center items-center text-black">
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            accept=".pdf"
            onChange={captureFile}
            className="text-white"
          />
          <PrimaryButton
            type="submit"
            text="Submit Contract"
            size="large"
          ></PrimaryButton>
          <p className="font-bold text-white my-3">IPFS Code</p>
          <div className="text-white">{output?.path}</div>
          {output?.path && (
            <a
              href={`https://gateway.ipfs.io/ipfs/QmdncXZpC2QsutQFE38b8meRnH9c74fphbXbdJKXgt3dHR`}
              className="list-none underline my-6 font-bold text-white inline-block"
              target="__blank"
            >
              Check out uploaded file
            </a>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contract;
