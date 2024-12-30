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
    const [isNearHeaderOrTool, setIsNearHeaderOrTool] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef && "current" in containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });

        if (!cursor) {
          const header = document.querySelector(".header") as HTMLElement;
          const tool = document.querySelector(".tool") as HTMLElement;

          let isNear = false;
          if (header) {
            const headerRect = header.getBoundingClientRect();
            isNear = e.clientY <= headerRect.bottom + 15;
          }

          if (tool) {
            const toolRect = tool.getBoundingClientRect();
            if (
              e.clientX >= toolRect.left - 28 &&
              e.clientX <= toolRect.right &&
              e.clientY >= toolRect.top + 15 &&
              e.clientY <= toolRect.bottom + 15
            ) {
              isNear = true; // Cursor is inside the .tool container
            }
          }

          setIsNearHeaderOrTool(isNear);
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
        {!isMouseDown && !isNearHeaderOrTool && selectedIcon && (
          <div
            style={{
              position: "fixed",
              left: cursorPosition.x + positionX,
              top: cursorPosition.y + positionY,
              pointerEvents: "none",
              zIndex: 9999,
              opacity: isMouseDown || isNearHeaderOrTool ? 0 : 1, // Hide icon near header or inside .tool
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
