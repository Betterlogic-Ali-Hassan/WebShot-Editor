/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChromePicker } from "react-color";
import { Theme } from "@/components/svgs";
import { FaCheck } from "react-icons/fa6";

export default function ColorPicker({
  select,
  icon,
}: {
  select?: boolean;
  icon?: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const handlePopOver = () => {
    setPopoverOpen(false);
    setShowPicker(false);
  };

  const colors = [
    // Row 1
    "#FF0000",
    "#FF4D00",
    "#FFD300",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#9900FF",
    "#FF00FF",
    "#FFFFFF",
    // Row 2
    "#FFB3B3",
    "#FFD9B3",
    "#FFF6B3",
    "#B3FFB3",
    "#B3FFFF",
    "#B3B3FF",
    "#F0B3FF",
    "#FFB3FF",
    "#F2F2F2",
    // Row 3
    "#FF6666",
    "#FFB366",
    "#FFED66",
    "#66FF66",
    "#66FFFF",
    "#6666FF",
    "#E066FF",
    "#FF66FF",
    "#E6E6E6",
    // Row 4
    "#FF0000",
    "#FF8C00",
    "#FFE500",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#CC00FF",
    "#FF00FF",
    "#CCCCCC",
    // Row 5
    "#CC0000",
    "#CC7000",
    "#CCB800",
    "#00CC00",
    "#00CCCC",
    "#0000CC",
    "#A300CC",
    "#CC00CC",
    "#999999",
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (!recentColors.includes(color)) {
      setRecentColors((prev) => [color, ...prev.slice(0, 3)]);
    }
  };
  const handlePickerChangeComplete = (color: any) => {
    handleColorSelect(color.hex);
  };
  return (
    <div className={cn("mt-5", select && "mt-0")}>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          {select ? (
            <Button variant='outline' className=' border-0 justify-start p-2'>
              <div
                className='h-5 w-5 rounded border'
                style={{ backgroundColor: selectedColor }}
              />
              {!icon ? (
                <span>
                  <ChevronDown className='h-4 w-4 ' />
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
          className='min-w-[240px] p-3 bg-white mt-0 max-h-[350px] overflow-y-auto scrollbar '
          side='bottom'
        >
          <div className='p-2'>
            <div className='flex items-center justify-between mb-3'>
              <Button variant='outline' className=' justify-start'>
                <div className='flex items-center gap-2'>
                  <div
                    className='h-5 w-5 rounded border'
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className='uppercase'>{selectedColor}</span>
                </div>
              </Button>
              {!showPicker ? (
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => setShowPicker(true)}
                >
                  <Theme />
                </Button>
              ) : (
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={handlePopOver}
                >
                  <FaCheck size={20} />
                </Button>
              )}
            </div>

            {showPicker ? (
              <ChromePicker
                color={selectedColor}
                onChangeComplete={handlePickerChangeComplete}
                disableAlpha={true}
              />
            ) : (
              <>
                <div className='grid grid-cols-9 gap-1'>
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className='w-5 h-5 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
                {recentColors.length > 0 && (
                  <div className='mt-3'>
                    <div className='text-xs text-gray-500 mb-1'>
                      Recent Colors
                    </div>
                    <div className='flex gap-1'>
                      {recentColors.map((color, index) => (
                        <button
                          key={index}
                          className='w-5 h-5 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
