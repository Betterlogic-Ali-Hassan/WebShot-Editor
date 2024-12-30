import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useState } from "react";

interface CursorProps {
  selectedIcon?: React.ReactNode;
  selectedColor?: string;
  positionX?: number;
  positionY?: number;
  className?: string;
  cursor?: boolean;
}

const Cursor = forwardRef<HTMLDivElement, CursorProps>(
  (
    {
      selectedIcon,
      selectedColor,
      positionX = 0,
      positionY = 0,
      className,
      cursor,
    },
    containerRef
  ) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isInRestrictedArea, setIsInRestrictedArea] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef && "current" in containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });

        if (!cursor) {
          const target = e.target as HTMLElement;
          const isInHeader = target.closest("header.fixed") !== null;
          const isInInput = target.closest("input, textarea, select") !== null;
          setIsInRestrictedArea(isInHeader || isInInput);
        }
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
      <>
        {!isMouseDown && !isInRestrictedArea && selectedIcon && (
          <div
            style={{
              position: "fixed",
              left: cursorPosition.x + positionX,
              top: cursorPosition.y + positionY,
              pointerEvents: "none",
              zIndex: 9999,
              opacity: isMouseDown ? 0 : 1,
              color: selectedColor ? selectedColor : "currentcolor",
            }}
            className={cn("[&_svg]:h-[18px] [&_svg]:w-[18px]", className)}
          >
            {selectedIcon}
          </div>
        )}
      </>
    );
  }
);

Cursor.displayName = "Cursor";

export default Cursor;
