import React, { useState } from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <span className="bg-black rounded-md p-1 m-1">
      <Oval
        visible={true}
        height="30"
        width="30"
        color="white"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </span>
  );
};

export default Loader;
