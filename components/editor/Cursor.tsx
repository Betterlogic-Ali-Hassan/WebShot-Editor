"use client";

import React, { forwardRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CursorProps {
  selectedIcon?: React.ReactNode;
  selectedColor?: string;
  positionX?: number;
  positionY?: number;
  className?: string;
  cursor?: boolean;
}

interface CursorPosition {
  x: number;
  y: number;
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
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
      x: 0,
      y: 0,
    });
    const [isRestrictedArea, setIsRestrictedArea] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);

    const isInRestrictedArea = useCallback(
      (e: MouseEvent): boolean => {
        if (cursor) return false;

        const header = document.querySelector(".header") as HTMLElement;
        const tool = document.querySelector(".tool") as HTMLElement;
        const input =
          e.target instanceof HTMLElement &&
          e.target.closest("input, textarea, select");

        if (header) {
          const headerRect = header.getBoundingClientRect();
          if (e.clientY <= headerRect.bottom + 15) return true;
        }

        if (tool) {
          const toolRect = tool.getBoundingClientRect();
          if (
            e.clientX >= toolRect.left - 28 &&
            e.clientX <= toolRect.right &&
            e.clientY >= toolRect.top - 20 &&
            e.clientY <= toolRect.bottom + 15
          ) {
            return true;
          }
        }

        return !!input;
      },
      [cursor]
    );

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        setHasMoved(true);

        if (containerRef && "current" in containerRef && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setCursorPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });

          setIsRestrictedArea(isInRestrictedArea(e));
        }
      },
      [containerRef, isInRestrictedArea]
    );

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
    }, [handleMouseMove]);

    if (!hasMoved || isMouseDown || isRestrictedArea || !selectedIcon) {
      return null;
    }

    return (
      <div
        style={{
          position: "fixed",
          left: cursorPosition.x + positionX,
          top: cursorPosition.y + positionY,
          pointerEvents: "none",
          zIndex: 9999,
          color: selectedColor || "currentcolor",
        }}
        className={cn("[&_svg]:h-[18px] [&_svg]:w-[18px]", className)}
      >
        {selectedIcon}
      </div>
    );
  }
);

Cursor.displayName = "Cursor";
export default Cursor;
