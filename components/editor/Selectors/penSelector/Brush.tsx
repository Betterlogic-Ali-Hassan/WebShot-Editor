import { brushData } from "@/constant/PencilData";
import { cn } from "@/lib/utils";
import React from "react";
import LinePicker from "../BorderPicker";
import ColorPicker from "../borderSelector/ColorPicker2";
interface Props {
  onClick: (icon: React.ReactNode) => void;
  selectedIcon?: React.ReactNode;
}
const Brush = ({ onClick, selectedIcon }: Props) => {
  return (
    <>
      <ul className='flex  items-center max-sm:flex-col gap-2 w-full px-4'>
        {brushData.map((item, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-white",
              selectedIcon === item.icon && "  border-dotted border-border"
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
    </>
  );
};

export default Brush;
