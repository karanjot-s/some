import React from "react";

const ChatIcon = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="68"
      height="68"
      viewBox="0 0 70 70"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M44.8164 21.9023C45.5664 23.9992 45.9457 26.2106 45.9375 28.4375C45.9375 33.6589 43.8633 38.6665 40.1712 42.3587C36.479 46.0508 31.4714 48.125 26.25 48.125H25.1836C26.541 51.9642 29.0554 55.2881 32.3805 57.6387C35.7057 59.9893 39.6779 61.251 43.75 61.25H61.7969C62.232 61.25 62.6493 61.0771 62.957 60.7695C63.2646 60.4618 63.4375 60.0445 63.4375 59.6094V41.5625C63.4379 36.5254 61.5076 31.6797 58.0438 28.0226C54.5799 24.3655 49.8461 22.1752 44.8164 21.9023Z"
        // fill={color}
      />
      <path
        d="M46.375 19.8516C44.3985 15.2118 40.8795 11.3975 36.4138 9.05433C31.948 6.71112 26.8098 5.98292 21.8688 6.993C16.9278 8.00307 12.4875 10.6894 9.29966 14.5972C6.11178 18.505 4.37207 23.3943 4.375 28.4375V46.4844C4.375 47.4996 4.77832 48.4733 5.49624 49.1913C6.21415 49.9092 7.18785 50.3125 8.20313 50.3125H23.707C25.4149 54.2084 28.2191 57.5235 31.7778 59.8539C35.3365 62.1843 39.4962 63.4294 43.75 63.4375H61.7969C62.8122 63.4375 63.7859 63.0342 64.5038 62.3163C65.2217 61.5983 65.625 60.6246 65.625 59.6094V41.5625C65.6354 36.2132 63.6805 31.0464 60.1316 27.0438C56.5827 23.0412 51.6871 20.4817 46.375 19.8516ZM8.75 28.4375C8.75 24.9763 9.77636 21.5929 11.6993 18.715C13.6222 15.8372 16.3553 13.5941 19.553 12.2696C22.7508 10.9451 26.2694 10.5985 29.6641 11.2738C33.0588 11.949 36.177 13.6157 38.6244 16.0631C41.0718 18.5105 42.7385 21.6287 43.4137 25.0234C44.089 28.4181 43.7424 31.9367 42.4179 35.1345C41.0934 38.3322 38.8503 41.0653 35.9725 42.9882C33.0946 44.9111 29.7112 45.9375 26.25 45.9375H8.75V28.4375ZM61.25 59.0625H43.75C40.6558 59.0591 37.6174 58.2379 34.9428 56.682C32.2681 55.1262 30.0522 52.8911 28.5195 50.2031C33.8958 49.6301 38.8709 47.0912 42.4895 43.0739C46.108 39.0566 48.115 33.8442 48.125 28.4375C48.1189 27.1263 47.9999 25.8181 47.7695 24.5273C51.6071 25.433 55.0263 27.608 57.473 30.7C59.9198 33.7919 61.2507 37.6196 61.25 41.5625V59.0625Z"
        // fill={color}
      />
    </svg>
  );
};

ChatIcon.defaultProps = { className: "", color: "#94A3B8" };

export default ChatIcon;