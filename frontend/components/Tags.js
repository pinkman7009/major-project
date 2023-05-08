import React from "react";

const Tags = ({ title }) => {
  return (
    <div className="flex items-center">
      <div className="bg-gray-400 rounded-full text-[0.7rem] text-white font-bold p-3 mr-3 h-6 flex items-center justify-center">
        {title}
      </div>
    </div>
  );
};

export default Tags;
