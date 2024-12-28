import React, { useEffect, useRef, useState } from "react";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { TextEditor } from "./TextEditor";
import { TextAlign } from "./TextAlign";

import ColorPicker from "../borderSelector/ColorPicker2";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/svgs";
const Fonts = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container

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

  return (
    <div ref={containerRef}>
      <div className='flex items-center max-lg:flex-col gap-5 px-4 py-0.5 '>
        <div className='flex max-lg:flex-col gap-5'>
          <FontSelector />
          <FontSizeSelector />
        </div>
        <ColorPicker select />
        <TextEditor />
        <TextAlign />
        <div className='flex items-center gap-3'>
          <Separator orientation='vertical' className='max-sm:hidden' />
          <ColorPicker icon select />
        </div>
      </div>
      {!isMouseDown && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x + 26,
            top: cursorPosition.y + 13,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: isMouseDown ? 0 : 1,
          }}
          className='[&_svg]:h-[20px] [&_svg]:w-[20px] '
        >
          <Text />
        </div>
      )}
    </div>
  );
};

export default Fonts;
