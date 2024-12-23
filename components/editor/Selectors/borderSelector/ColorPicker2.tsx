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
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const storedRecentColors = localStorage.getItem("recentColors");
    if (storedRecentColors) {
      setRecentColors(JSON.parse(storedRecentColors).slice(0, 12));
    }
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setRecentColors((prev) => {
      const updatedColors = [color, ...prev.filter((c) => c !== color)].slice(
        0,
        12
      );
      localStorage.setItem("recentColors", JSON.stringify(updatedColors));
      return updatedColors;
    });
  };

  const handlePickerChangeComplete = (color: ColorResult) => {
    handleColorSelect(color.hex);
  };

  return (
    <div className={cn("mt-5", select && "mt-0")}>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
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
            onChangeComplete={handlePickerChangeComplete}
            className='min-w-[220px]'
            presetColors={recentColors}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
