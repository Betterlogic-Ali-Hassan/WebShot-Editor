import React from "react";
import { arrows } from "@/constant/arrows";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Arrows = ({ onClick }: Props) => {
  return (
    <ul className='flex flex-col gap-0.5 w-full'>
      {arrows.map((item, index) => (
        <li
          key={index}
          className='flex items-center justify-between gap-4 p-2 py-2 px-3 hover:bg-light cursor-pointer text-sm'
          onClick={() => onClick(item.icon)}
        >
          {item.name}
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default Arrows;
