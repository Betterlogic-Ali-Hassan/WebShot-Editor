"use client";

import { brushData } from "@/constant/PencilData";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";
import LinePicker from "../BorderPicker";
import ColorPicker from "../borderSelector/ColorPicker2";

interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon?: React.ReactNode;
}

const Brush = ({ onClick, selectedIcon }: Props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  return (
    <>
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
          <ColorPicker select />
        </li>
        <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
          <LinePicker />
        </li>
      </ul>
      {!isMouseDown && selectedIcon && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x - 160, // Offset by 10px to be near the cursor
            top: cursorPosition.y - 100,
            pointerEvents: "none",
            zIndex: 9999,
            transition: "opacity 0.1s ease-in-out",
            opacity: isMouseDown ? 0 : 1,
          }}
        >
          {selectedIcon}
        </div>
      )}
    </>
  );
};

export default Brush;
