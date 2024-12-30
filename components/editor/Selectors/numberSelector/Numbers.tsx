"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "../borderSelector/ColorPicker2";
import Cursor from "../../Cursor";

export default function Numbers() {
  const [counters, setCounters] = useState([1, 1, 1]);
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

  const buttonText = ["Circled", "Squared", "Plain"];

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
                    "border-dotted border-card-border bg-secondary"
                )}
              >
                <span
                  className={cn(
                    "border-[2.4px] border-dark text-[16px] h-5 w-5 font-bold flex justify-center items-center",
                    index === 0 && "rounded-full p-[10px]",
                    index === 1 && "rounded p-[10px]",
                    index === 2 &&
                      "border-0 w-auto text-lg leading-0 font-normal mb-0.5"
                  )}
                  style={{
                    fontFamily: index === 2 ? "system-ui" : "",
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
