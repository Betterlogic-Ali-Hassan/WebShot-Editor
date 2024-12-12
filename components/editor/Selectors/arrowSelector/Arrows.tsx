import React from "react";
import { arrows } from "@/constant/arrows";
import { cn } from "@/lib/utils";
import ColorPicker from "../borderSelector/ColorPicker2";
import LinePicker from "../BorderPicker";
interface Props {
  onClick: (icon: React.ReactNode) => void;
  selectedIcon: React.ReactNode;
}
const Arrows = ({ onClick, selectedIcon }: Props) => {
  return (
    <ul className='flex items-center gap-2 px-4 w-full'>
      {arrows.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center gap-2 rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm",
            selectedIcon === item.icon && " border-2 border-dotted"
          )}
          onClick={() => onClick(item.icon)}
        >
          {item.icon}
          {item.name}
        </li>
      ))}
      <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
        <ColorPicker select />
      </li>
      <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
        <LinePicker />
      </li>
    </ul>
  );
};

export default Arrows;
