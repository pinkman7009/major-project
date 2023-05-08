import axios from "axios";
import React, { useState, useEffect } from "react";
import { PrimaryButton } from "./Buttons";

const Modal = ({ setModalOpen, service, onChange, handleSubmit }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tag`
        );
        setTags(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
  }, []);
  return (
    <div className="w-full h-full top-0 left-0 fixed z-10 bg-modal flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/2 relative">
        <span
          className="absolute top-3 right-3 font-bold text-black text-3xl cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          &times;
        </span>
        <div className="flex items-center justify-center flex-col">
          <h3 className="text-purple-dark font-bold text-xl">Add a Service</h3>
          <input
            name="name"
            type="text"
            className="rounded-md p-3 w-2/3 my-6 bg-gray-200"
            placeholder="Service Name"
            onChange={onChange}
            value={service.name}
          />
          <textarea
            name="description"
            placeholder="Service Description"
            className="my-6 h-80 p-3 w-2/3 rounded-lg border-2  bg-gray-200 text-black"
            value={service.description}
            onChange={onChange}
          ></textarea>
          <select
            name="tag"
            id=""
            className="rounded-md p-3 w-2/3 my-6 bg-gray-200"
            onChange={onChange}
          >
            {tags.map((item) => (
              <option value={item._id}>{item.title}</option>
            ))}
          </select>
          <input
            name="cost"
            type="number"
            className="rounded-md p-3 w-2/3 my-6 bg-gray-200"
            placeholder="Service Cost"
            onChange={onChange}
            value={service.cost}
          />
          <PrimaryButton text="Add" handleClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
