// Header.js
import React from "react";

const Heading = ({title}: {title: string}) => {
  return (
    <div className="bg-pink-500 py-2 my-8 text-white text-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
};

export default Heading;
