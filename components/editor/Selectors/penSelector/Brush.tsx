import { brushData } from "@/constant/PencilData";
import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
  selectedIcon?: React.ReactNode;
}
const Brush = ({ onClick, selectedIcon }: Props) => {
  return (
    <>
      <ul className='flex  items-center gap-2 w-full px-4'>
        {brushData.map((item, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-3 rounded-md py-2 px-3 border-2  hover:bg-light cursor-pointer text-sm",
              selectedIcon === item.icon && "border-dotted"
            )}
            onClick={() => onClick(item.icon)}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Brush;
