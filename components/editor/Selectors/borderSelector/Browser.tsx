import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const Browser = () => {
  const [selected, setSelected] = useState("first");
  const handleSelectedItem = (item: string) => {
    setSelected(item);
  };
  return (
    <>
      <div className='space-y-2'>
        <div
          className={cn(
            "h-8 bg-secondary rounded flex items-center px-2 space-x-2 border border-gray-200 cursor-pointer",
            selected === "first" && "border-black border-2"
          )}
          onClick={() => handleSelectedItem("first")}
        >
          <div className='flex space-x-1.5'>
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
          </div>
          <div className='flex-1 h-4 bg-light rounded' />
        </div>

        <div
          className={cn(
            "h-8 bg-secondary rounded flex items-center px-2 space-x-2 border border-gray-200 cursor-pointer",
            selected === "second" && "border-black border-2"
          )}
          onClick={() => handleSelectedItem("second")}
        >
          <div className='flex space-x-1.5'>
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
            <div className='w-2.5 h-2.5 rounded-full bg-white' />
          </div>
          <div className='flex-1 h-4 bg-light rounded' />
        </div>
      </div>

      <div className='space-y-2'>
        <Button
          className={cn(
            "text-sm text-black bg-secondary border w-full border-border rounded ",
            selected === "urlTop" && "border-black border-2"
          )}
          size='sm'
          onClick={() => handleSelectedItem("urlTop")}
        >
          URL on top
        </Button>
        <Button
          className={cn(
            "text-sm text-black bg-light border border-border w-full rounded",
            selected === "urlBottom" && "border-black border-2"
          )}
          size='sm'
          onClick={() => handleSelectedItem("urlBottom")}
        >
          URL on bottom
        </Button>
      </div>

      <div className='space-y-2'>
        <div className='flex items-center space-x-2 '>
          <Checkbox id='include-url' defaultChecked />
          <Label htmlFor='include-url' className='text-sm cursor-pointer'>
            Include URL
          </Label>
        </div>
        <div className='flex items-center space-x-2 '>
          <Checkbox id='include-date' defaultChecked />
          <Label htmlFor='include-date' className='text-sm cursor-pointer'>
            Include Date
          </Label>
        </div>
      </div>
    </>
  );
};

export default Browser;
