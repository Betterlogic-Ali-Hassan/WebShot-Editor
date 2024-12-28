"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "../borderSelector/ColorPicker2";

export default function Numbers() {
  const [counters, setCounters] = useState([0, 0, 0]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState("rgba(255, 0, 0, 1)");

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
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

  // Update the body's cursor based on the selected state
  useEffect(() => {
    if (selected !== null) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = "";
    };
  }, [selected]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const incrementCounter = (index: number) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index]++;
      return newCounters;
    });
    setSelected(index);
  };

  const buttonText = ["Circled", "Squared", "Bold"];

  return (
    <div ref={containerRef}>
      <div className='flex items-center max-sm:flex-col gap-2 w-full px-4'>
        {counters.map((count, index) => (
          <div
            key={index}
            onClick={() => incrementCounter(index)}
            className={cn(
              "flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer border-2 border-transparent text-base",
              selected === index &&
                "border-dotted border-card-border bg-secondary",
              index === 2 && "font-bold"
            )}
          >
            <span
              className={cn(
                "border-2 border-dark text-[15px] h-5 font-bold w-5 flex justify-center items-center",
                index === 0 && "rounded-full",
                index === 1 && "rounded",
                index === 2 && "border-0 w-auto text-lg"
              )}
              style={{
                fontFamily: index === 2 ? "Be Vietnam Pro" : "",
              }}
            >
              {count}
            </span>
            {buttonText[index]}
          </div>
        ))}
        <div>
          <ColorPicker select onColorChange={handleColorChange} />
        </div>
      </div>
      {!isMouseDown && selected !== null && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x + 28,
            top: cursorPosition.y + 16,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: isMouseDown ? 0 : 1,
            color: selectedColor,
            border:
              selected === 0
                ? `2px solid ${selectedColor}`
                : selected === 1
                ? `2px solid ${selectedColor}`
                : "none",
            borderRadius: selected === 0 ? "50%" : selected === 1 ? "4px" : "0",
            fontSize: selected === 2 ? "18px" : "normal",
            height: "22px",
            width: "22px",
          }}
          className='flex items-center justify-center font-bold '
        >
          {counters[selected]}
        </div>
      )}
    </div>
  );
}
