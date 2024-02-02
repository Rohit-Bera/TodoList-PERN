import React from "react";

const Input = ({
  type,
  placeholder,
  name,
  value,
  handleInput,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      className={`${className} border-2 border-r-5 border-black p-1 m-1 rounded-md`}
      onChange={handleInput}
      required
    />
  );
};

export default Input;
