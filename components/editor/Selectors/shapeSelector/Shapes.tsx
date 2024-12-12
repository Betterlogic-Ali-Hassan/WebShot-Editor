import React from "react";
import { shapesData } from "@/constant/shapeData";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Shapes = ({ onClick }: Props) => {
  return (
    <ul className='flex items-center gap-2 px-4 w-full'>
      {shapesData.map((item, index) => (
        <li
          key={index}
          className='flex items-center gap-3 rounded-md py-2 px-3 border-2 border-dotted hover:bg-light cursor-pointer text-sm'
          onClick={() => onClick(item.icon)}
        >
          {item.name}
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default Shapes;
