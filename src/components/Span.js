import React from "react";

const Span = ({ child, className = "" }) => {
  return <span className={` ${className} `}>{child}</span>;
};

export default Span;
