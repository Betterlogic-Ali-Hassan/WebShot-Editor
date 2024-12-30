"use client";

import { brushData } from "@/constant/PencilData";
import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import LinePicker from "../BorderPicker";
import ColorPicker from "../borderSelector/ColorPicker2";
import Cursor from "../../Cursor";

interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon?: React.ReactNode;
}

const Brush = ({ onClick, selectedIcon }: Props) => {
  const [selectedColor, setSelectedColor] = useState("rgba(255, 0, 0, 1)");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <div ref={containerRef}>
      <ul className='flex items-center max-sm:flex-col gap-2 w-full px-4'>
        {brushData.map((item, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-transparent",
              selectedIcon === item.icon &&
                "border-dotted border-card-border bg-secondary"
            )}
            onClick={() => onClick(item.icon, item.name)}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
        <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
          <ColorPicker select onColorChange={handleColorChange} />
        </li>
        <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
          <LinePicker />
        </li>
      </ul>
      <Cursor
        selectedColor={selectedColor}
        selectedIcon={selectedIcon}
        ref={containerRef}
        positionX={26}
        positionY={13}
        className='[&_svg]:h-[22px] [&_svg]:w-[22px] '
      />
    </div>
  );
};

export default Brush;
