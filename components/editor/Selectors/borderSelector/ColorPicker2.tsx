"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SketchPicker, ColorResult } from "react-color";

export default function ColorPicker({
  select,
  icon,
}: {
  select?: boolean;
  icon?: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState("rgba(255, 0, 0, 1)");
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const storedRecentColors = localStorage.getItem("recentColors");
    if (storedRecentColors) {
      setRecentColors(JSON.parse(storedRecentColors).slice(0, 12));
    }
  }, []);

  const handlePickerChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    setSelectedColor(rgba);
  };

  const handlePopoverClose = (isOpen: boolean) => {
    setPopoverOpen(isOpen);
    if (!isOpen) {
      setRecentColors((prev) => {
        const updatedColors = [
          selectedColor,
          ...prev.filter((color) => color !== selectedColor),
        ].slice(0, 12);

        localStorage.setItem("recentColors", JSON.stringify(updatedColors));
        return updatedColors;
      });
    }
  };

  return (
    <div className={cn("mt-5", select && "mt-0")}>
      <Popover open={popoverOpen} onOpenChange={handlePopoverClose}>
        <PopoverTrigger asChild>
          {select ? (
            <Button variant='outline' className='border-0 justify-start p-2'>
              <div
                className='h-5 w-5 rounded border'
                style={{ backgroundColor: selectedColor }}
              />
              {!icon ? (
                <span>
                  <ChevronDown className='h-4 w-4' />
                </span>
              ) : (
                <p className='whitespace-nowrap cursor-pointer'>
                  Background fill
                </p>
              )}
            </Button>
          ) : (
            <Button variant='outline' className='w-[200px] justify-start'>
              <div className='flex items-center gap-2'>
                <div
                  className='h-5 w-5 rounded border'
                  style={{ backgroundColor: selectedColor }}
                />
                <span className='uppercase'>{selectedColor}</span>
              </div>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className='p-0 bg-white mt-0 overflow-y-auto scrollbar'
          side='bottom'
        >
          <SketchPicker
            color={selectedColor}
            onChange={handlePickerChange}
            className='min-w-[220px] !p-3'
            presetColors={recentColors}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
