import React from "react";
import { arrows } from "@/constant/arrows";

const Arrows = () => {
  return (
    <ul className='flex flex-col gap-3 w-full'>
      {arrows.map((item, index) => (
        <li
          key={index}
          className='flex items-center justify-between gap-4 p-2 hover:bg-light cursor-pointer text-sm'
        >
          {item.name}
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default Arrows;
