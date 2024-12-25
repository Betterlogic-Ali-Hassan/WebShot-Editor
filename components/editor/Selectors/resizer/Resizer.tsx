"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import InputWithBtn from "../../InputWithBtn";

interface Props {
  handleId: () => void;
}

const Resizer = ({ handleId }: Props) => {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    setAspectRatio(width / height);
  }, []);

  const adjustDimension = (
    dimension: "width" | "height",
    increment: boolean
  ) => {
    const change = increment ? 1 : -1;
    if (dimension === "width") {
      const newWidth = Math.max(1, width + change);
      setWidth(newWidth);
      if (isLocked) {
        setHeight(Math.round(newWidth / aspectRatio));
      }
    } else {
      const newHeight = Math.max(1, height + change);
      setHeight(newHeight);
      if (isLocked) {
        setWidth(Math.round(newHeight * aspectRatio));
      }
    }
  };

  const handleInputChange = (dimension: "width" | "height", value: number) => {
    if (dimension === "width") {
      setWidth(value);
      if (isLocked) {
        setHeight(Math.round(value / aspectRatio));
      }
    } else {
      setHeight(value);
      if (isLocked) {
        setWidth(Math.round(value * aspectRatio));
      }
    }
  };

  const toggleLock = () => {
    if (!isLocked) {
      setAspectRatio(width / height);
    }
    setIsLocked(!isLocked);
  };

  return (
    <div className='flex flex-col gap-3 px-4 py-2'>
      <div className='flex gap-4 items-center max-sm:flex-col'>
        <div className='space-y-1 flex flex-col'>
          <Label className='text-sm font-medium text-foreground'>Width</Label>
          <InputWithBtn
            val={width}
            unit='px'
            decrement={() => adjustDimension("width", false)}
            increment={() => adjustDimension("width", true)}
            onChange={(value: number) => handleInputChange("width", value)}
          />
        </div>
        <div className='space-y-1 flex flex-col'>
          <Label className='text-sm font-medium text-foreground'>Height</Label>
          <InputWithBtn
            val={height}
            unit='px'
            decrement={() => adjustDimension("height", false)}
            increment={() => adjustDimension("height", true)}
            onChange={(value: number) => handleInputChange("height", value)}
          />
        </div>
        <div
          className='flex items-center gap-2 mt-2 sm:mt-[28px]'
          onClick={toggleLock}
        >
          <Checkbox id='checkbox' checked={isLocked} />
          <Label htmlFor='checkbox' className='cursor-pointer'>
            Proportional
          </Label>
        </div>
        <Button
          onClick={handleId}
          className='bg-dark text-bg hover:bg-dark/80 mt-4 sm:mt-7 max-sm:w-full'
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default Resizer;
