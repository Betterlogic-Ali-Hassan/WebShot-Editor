"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import LinePicker from "../BorderPicker";
import ColorPicker from "../borderSelector/ColorPicker2";
import { arrowBox } from "@/constant/arrowBox";

interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon?: React.ReactNode;
}

const TextArrow = ({ onClick, selectedIcon }: Props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container
  const [selectedColor, setSelectedColor] = useState("rgba(255, 0, 0, 1)");

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left, // Adjust cursor position relative to the container
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  const handleColorChange = (color: string) => {
    setSelectedColor(color); // Update the selected color
  };
  return (
    <div ref={containerRef}>
      <ul className='flex items-center max-sm:flex-col gap-2 w-full px-4'>
        {arrowBox.map((item, index) => (
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

      {/* Cursor Icon */}
      {!isMouseDown && selectedIcon && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x + 22,
            top: cursorPosition.y + 18,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: isMouseDown ? 0 : 1,
            color: selectedColor,
          }}
          className='[&_svg]:h-[20px] [&_svg]:w-[20px] '
        >
          {selectedIcon}
        </div>
      )}
    </div>
  );
};

export default TextArrow;
