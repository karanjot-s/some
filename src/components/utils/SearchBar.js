import React from "react";
import SearchIcon from "../icons/Search";

const SearchBar = ({ placeholder, className, fullWidth }) => {
  return (
    <div
      className={`flex bg-slate-800 px-4 py-2 rounded-xl mx-auto ${
        fullWidth ? "w-11/12" : "w-96"
      } ${className}`}
    >
      <input
        className={`bg-transparent outline-none text-lg flex-1 `}
        placeholder={placeholder ? placeholder : "Search..."}
      />
      <SearchIcon classname="shrink-0" />
    </div>
  );
};

export default SearchBar;
