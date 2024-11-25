import React from "react";

const BigSearchIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="68"
      height="68"
      viewBox="0 0 24 24"
      className={`scale-x-[-1] translate-x-2 p-1 ${className}`}
    >
      <g fill="none">
        <path
          fill="currentColor"
          d="M19 11a8 8 0 1 1-16 0a8 8 0 0 1 16 0"
          opacity="0.16"
        />
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
        />
      </g>
    </svg>
  );
};

export default BigSearchIcon;
