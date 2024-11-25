import React from "react";

const SelectionBox = ({ item, allItems, changeItem, hidden, className }) => {
  return (
    <div
      hidden={hidden}
      className={`bg-slate-800 m-auto rounded-3xl text-center py-8 mt-10 px-8 w-full md:w-[35rem] ${className}`}
    >
      <div className="relative flex h-full">
        <div
          className={`absolute bg-slate-700 w-1/2 h-10 top-1/2 rounded-lg transition ease-in-out duration-200`}
          style={{
            transform: `translate(${
              100 * item
            }%, -50%) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }}
        />
        {allItems.map((it, ind) => (
          <div
            key={ind}
            className="flex-1 z-10 cursor-pointer"
            onClick={() => {
              changeItem(it.value);
            }}
          >
            {it.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionBox;
