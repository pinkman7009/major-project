import React, { useState } from "react";
import { PrimaryButton } from "./Buttons";
import axios from "axios";

const Summarizer = () => {
  const [text, setText] = useState("");

  const [summarizedText, setSummarizedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(text);
      const response = await axios.post(
        `http://127.0.0.1:8000/?command=summarize&input_text=${text}`,
        {
          headers: {
            "Context-type": "application/json",
          },
        }
      );

      console.log({ response: response.data[0] });
      setSummarizedText(response.data[0]);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-primary bg-opacity-40 border-2 border-primary rounded-lg px-5 py-12 w-5/6 h-5/6">
        <h1 className="text-white text-3xl font-bold text-center">
          Summarizer
        </h1>
        <div className="p-4 flex flex-col items-center">
          <div className="text-gray-400 text-xl pb-5">
            Summarize lengthly legal documents in few seconds!
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-5/6 h-5/6"
          >
            <div className="w-full text-start my-3 font-bold">Legal Text</div>
            <textarea
              className="w-full border-2 border-primary rounded-lg h-48 text-black p-2"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="pt-4">OR</div>
            <PrimaryButton text="Upload File" />
            <PrimaryButton
              text="Generalte Result"
              size="large"
              handleClick={handleSubmit}
            />
            <div className="w-full text-start my-3 font-bold">
              Summarized text
            </div>
            <textarea
              className="w-full border-2 border-primary rounded-lg h-48 text-black p-2"
              value={summarizedText}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
