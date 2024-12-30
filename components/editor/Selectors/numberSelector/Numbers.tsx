"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "../borderSelector/ColorPicker2";
import Cursor from "../../Cursor";

export default function Numbers() {
  const [counters, setCounters] = useState([0, 0, 0]);
  const [selected, setSelected] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState("rgba(255, 0, 0, 1)");

  useEffect(() => {
    if (selected >= 0) {
      document.body.classList.add("hide-cursor");
    } else {
      document.body.classList.remove("hide-cursor");
    }
    return () => {
      document.body.classList.remove("hide-cursor");
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
    <>
      {selected !== null && (
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
          <Cursor
            cursor
            positionX={28}
            positionY={16}
            ref={containerRef}
            selectedColor={selectedColor}
            selectedIcon={counters[selected]}
            className={cn(
              "flex items-center justify-center font-bold h-[22px] w-[22px]",
              selected === 2 ? "text-lg" : "normal",
              selected === 0
                ? `rounded-full border-2 border-${selectedColor} `
                : "border-none",
              selected === 1
                ? "rounded-[4px] border-2 border-${selectedColor}"
                : "rounded-none border-none"
            )}
          />
        </div>
      )}
    </>
  );
}
