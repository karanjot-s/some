import React from "react";

const BackArrowIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="0.8em"
      height="1em"
      viewBox="0 0 12 24"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
      />
    </svg>
  );
};

export default BackArrowIcon;