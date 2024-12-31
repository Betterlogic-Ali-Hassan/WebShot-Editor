"use client";

import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Tooltip from "@/components/Tooltip";
import { options } from "@/constant/option";
import { MenuItem } from "./MenuItem";

export function OptionsMenu() {
  const [showAll, setShowAll] = useState(false);

  const visibleOptions = showAll ? options : options.slice(0, 3);

  return (
    <div>
      {visibleOptions.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          name={item.name}
          time={item.time}
          shortcut={item.key}
        />
      ))}
      <div
        onClick={() => setShowAll(!showAll)}
        className='cursor-pointer flex items-center justify-center'
      >
        <Tooltip content={showAll ? "Hide" : "More"}>
          <BsThreeDots size={22} />
        </Tooltip>
      </div>
    </div>
  );
}
