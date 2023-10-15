// Header.js
import React from "react";

const Heading = ({title}: {title: string}) => {
  return (
    <div className=" py-2 my-4 mb-12 text-pink-700 text-center">
      <h1 className="text-5xl font-semibold">{title}</h1>
    </div>
  );
};

export default Heading;
