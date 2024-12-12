import React from "react";
import { shapesData } from "@/constant/shapeData";
import { cn } from "@/lib/utils";
interface Props {
  onClick: (icon: React.ReactNode) => void;
  selectedIcon?: React.ReactNode;
}
const Shapes = ({ onClick, selectedIcon }: Props) => {
  return (
    <ul className='flex items-center gap-2 px-4 w-full'>
      {shapesData.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center gap-3 rounded-md py-2 px-3 border-2  hover:bg-light cursor-pointer text-sm",
            selectedIcon === item.icon && "border-dotted"
          )}
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
