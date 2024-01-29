import React from "react";

const Button = ({ title, clickAction, className = "" }) => {
  return (
    <button
      className={`${className} rounded-md p-1 m-1 bg-black text-white px-3 `}
      onClick={clickAction}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
