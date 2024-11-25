import React from "react";
import SearchIcon from "../icons/Search";
import CrossIcon from "../icons/Cross";

const SearchBar = ({ placeholder, className, fullWidth, value, onChange }) => {
  return (
    <div
      className={`flex bg-slate-800 px-4 py-2 rounded-xl mx-auto ${
        fullWidth ? "w-11/12" : "w-96"
      } ${className}`}
    >
      <input
        className={`bg-transparent outline-none text-lg flex-1 `}
        placeholder={placeholder ? placeholder : "Search..."}
        value={value}
        onChange={onChange}
      />
      {value ? (
        <span
          className="cursor-pointer"
          onClick={() => onChange({ target: { value: "" } })}
        >
          <CrossIcon className="shrink-0" />
        </span>
      ) : (
        <SearchIcon classname="shrink-0" />
      )}
    </div>
  );
};

export default SearchBar;
