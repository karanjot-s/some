import React, { useState } from "react";

const LikeIcon = ({ className, onChange, initial }) => {
  const [red, setRed] = useState(initial);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        onChange(!red);
        setRed((old) => !old);
      }}
    >
      <svg
        className={className}
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_4_93"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="9"
          width="62"
          height="53"
        >
          <path
            className="transition duration-1000"
            d="M21.25 11.3333C12.6437 11.3333 5.66666 18.3104 5.66666 26.9167C5.66666 42.5 24.0833 56.6667 34 59.9619C43.9167 56.6667 62.3333 42.5 62.3333 26.9167C62.3333 18.3104 55.3562 11.3333 46.75 11.3333C41.48 11.3333 36.8192 13.9499 34 17.9548C32.563 15.9081 30.6541 14.2376 28.4347 13.085C26.2153 11.9324 23.7508 11.3316 21.25 11.3333Z"
            fill="#555555"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
        <g mask="url(#mask0_4_93)">
          <path
            className="transition duration-1000"
            d="M0 0H68V68H0V0Z"
            fill="#94A3B8"
          />
        </g>
      </svg>
      {red && (
        <svg
          className="absolute top-3 w-full animate-like"
          width="61"
          height="53"
          viewBox="0 0 61 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5833 2C8.97708 2 2 8.97709 2 17.5833C2 33.1667 20.4167 47.3333 30.3333 50.6285C40.25 47.3333 58.6667 33.1667 58.6667 17.5833C58.6667 8.97709 51.6896 2 43.0833 2C37.8133 2 33.1525 4.61659 30.3333 8.6215C28.8964 6.57471 26.9874 4.9043 24.768 3.75169C22.5486 2.59909 20.0842 1.99824 17.5833 2Z"
            fill="#F87171"
            stroke="#F87171"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default LikeIcon;
