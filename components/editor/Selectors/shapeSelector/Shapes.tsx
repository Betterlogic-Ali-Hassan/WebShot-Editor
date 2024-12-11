import React from "react";
import { shapesData } from "@/constant/shapeData";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Shapes = ({ onClick }: Props) => {
  return (
    <ul className='flex flex-col gap-0.5 w-full'>
      {shapesData.map((item, index) => (
        <li
          key={index}
          className='flex items-center justify-between gap-4 py-2 px-3 hover:bg-light cursor-pointer text-sm'
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
