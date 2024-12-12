import React from "react";
import { arrows } from "@/constant/arrows";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Arrows = ({ onClick }: Props) => {
  return (
    <ul className='flex items-center gap-2 px-4 w-full'>
      {arrows.map((item, index) => (
        <li
          key={index}
          className='flex items-center gap-3 rounded-md py-2 px-3 border-2 border-dotted hover:bg-light cursor-pointer text-sm'
          onClick={() => onClick(item.icon)}
        >
          {item.icon}
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Arrows;
