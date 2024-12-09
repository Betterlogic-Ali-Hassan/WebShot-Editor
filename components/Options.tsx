import { options } from "@/constant/option";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import Tooltip from "./Tooltip";

const Menu = () => {
  const [showAll, setShowAll] = useState(false); // State for showing all items

  const handleShowAll = () => {
    setShowAll(!showAll); // Toggle between showing all items
  };

  return (
    <div>
      {options.slice(0, 3).map((item, i) => (
        <div
          key={i}
          className='flex items-center gap-2 py-[10px] px-3.5 hover:bg-light cursor-pointer text-sm'
        >
          <span>
            <IoVideocamOutline size={20} />
          </span>
          <h4>{item.name}</h4>
        </div>
      ))}
      {showAll &&
        options.slice(3).map((item, i) => (
          <div
            key={i}
            className='flex items-center gap-2 py-[10px] px-3.5 hover:bg-light cursor-pointer text-sm'
          >
            <span>
              <IoVideocamOutline size={20} />
            </span>
            <h4>{item.name}</h4>
          </div>
        ))}
      <div
        onClick={handleShowAll}
        className='cursor-pointer flex items-center justify-center'
      >
        <Tooltip content={showAll ? "Hide" : "More"}>
          <BsThreeDots size={22} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Menu;
