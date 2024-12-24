import React, { useState } from "react";
import { shapesData } from "@/constant/shapeData";
import { cn } from "@/lib/utils";
import ColorPicker from "../borderSelector/ColorPicker2";
import LinePicker from "../BorderPicker";
interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon?: React.ReactNode;
}
const Shapes = ({ onClick, selectedIcon }: Props) => {
  const [defaultIcon, setDefaultIcon] = useState<React.ReactNode>(
    shapesData[0].icon
  );

  const handleClick = (icon: React.ReactNode, name: string) => {
    onClick(icon, name);
    setDefaultIcon(icon);
  };
  return (
    <ul className='flex items-center max-sm:flex-col gap-2 px-4 w-full'>
      {shapesData.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center gap-1.5 rounded-md py-2 px-3  hover:bg-light cursor-pointer text-sm border-2 border-white max-sm:w-full ",
            (selectedIcon === item.icon || defaultIcon === item.icon) &&
              " border-dotted border-border"
          )}
          onClick={() => handleClick(item.icon, item.name)}
        >
          {item.icon}
          <span className='mt-0.5'>{item.name}</span>
        </li>
      ))}
      <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer '>
        <ColorPicker select />
      </li>
      <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
        <LinePicker />
      </li>
    </ul>
  );
};

export default Shapes;
