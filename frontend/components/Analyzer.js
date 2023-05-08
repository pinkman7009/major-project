import React, { useState } from "react";
import { PrimaryButton } from "./Buttons";
import axios from "axios";

const Analyzer = () => {
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ question, text });

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/answer?question=${question}&input_text=${text}`,
        {
          headers: {
            "Context-type": "application/json",
          },
        }
      );

      setAnswer(response.data[0]);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-primary bg-opacity-40 border-2 border-primary rounded-lg px-5 py-12 w-5/6 h-5/6">
        <h1 className="text-white text-3xl font-bold text-center">
          Ask me anything
        </h1>
        <div className="p-4 flex flex-col items-center">
          <div className="text-gray-400 text-xl pb-5">
            Ask anything to your legal document, our AI powered services will
            give you the answer!
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-5/6 h-5/6"
          >
            <div className="w-full text-start font-bold my-3">Legal Text</div>
            <textarea
              className="w-full border-2 border-primary rounded-lg h-36 text-black p-2"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="my-3">OR</div>
            <PrimaryButton text="Upload File" />
            <div className="w-full text-start font-bold my-3">
              Type in your question!
            </div>
            <input
              className="w-full border-2 border-primary rounded-lg p-2 text-black"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <PrimaryButton
              text="Generalte Result"
              size="large"
              handleClick={handleSubmit}
            />
            <div className="w-full text-start font-bold my-3">
              Answer to your question
            </div>
            <textarea
              className="w-full border-2 border-primary rounded-lg h-48 text-black p-2"
              value={answer}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
