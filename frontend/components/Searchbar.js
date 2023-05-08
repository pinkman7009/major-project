import React from "react";

const Searchbar = ({ text, onChange, onSubmit }) => {
  return (
    <div className="flex w-1/2 items-center">
      <input
        type="text"
        placeholder="Search for services or describe your problem"
        className="bg-white rounded-l-lg p-3 w-full text-black focus:outline-none"
        value={text}
        onChange={onChange}
      />
      <button
        className="bg-primary rounded-r-lg border-primary border-8 h-full w-16 flex justify-center items-center"
        onClick={onSubmit}
      >
        <img src="search.svg" alt="" />
      </button>
    </div>
  );
};

export default Searchbar;
