import { stickers } from "@/constant/stickers";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
  selectedIcon?: React.ReactNode;
}
const Sticker = ({ onClick, selectedIcon }: Props) => {
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
      <div className='grid grid-cols-6 gap-2 px-4 max-h-[180px] overflow-y-auto scrollbar'>
        {stickers.map((item, i) => (
          <div
            key={i}
            className={cn(
              "hover:bg-light cursor-pointer p-2 rounded-md inline-flex items-center justify-center border-2 border-transparent  max-sm:w-full",
              selectedIcon === item.src &&
                "border-dotted border-2 border-card-border bg-secondary"
            )}
            onClick={() => onClick(item.src)}
          >
            {item.src}
          </div>
        ))}
      </div>
      {!isMouseDown && selectedIcon && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x + 28,
            top: cursorPosition.y + 16,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: isMouseDown ? 0 : 1,
          }}
          className='[&_svg]:h-[22px] [&_svg]:w-[22px] '
        >
          {selectedIcon}
        </div>
      )}
    </div>
  );
};

export default Sticker;
