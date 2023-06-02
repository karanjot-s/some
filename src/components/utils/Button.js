import React from "react";

const Button = ({ children }) => {
  return (
    <button className="transition bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2">
      {children}
    </button>
  );
};

export default Button;
