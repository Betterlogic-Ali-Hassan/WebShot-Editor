import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
          className='flex items-center cursor-pointer'
          onClick={() => handleSelectedItem("first")}
        >
          <Image
            src='/win.png'
            alt='img'
            height={40}
            width={160}
            className={cn(
              "rounded-md object-cover border-2 border-border",
              selected === "first" && "border-black border-2"
            )}
          />
        </div>

        <div
          className=' flex items-center   cursor-pointer'
          onClick={() => handleSelectedItem("second")}
        >
          <Image
            src='/mac.png'
            alt='img'
            height={200}
            width={200}
            className={cn(
              "rounded-md object-cover border-2 border-border",
              selected === "second" && "border-black border-2"
            )}
          />
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
        <div className='flex items-center  justify-between py-1 '>
          <Label htmlFor='include-url' className='text-sm cursor-pointer'>
            Include URL
          </Label>
          <Checkbox id='include-url' defaultChecked />
        </div>
        <div className='flex items-center  justify-between pb-1.5 '>
          <Label htmlFor='include-date' className='text-sm cursor-pointer'>
            Include Date
          </Label>
          <Checkbox id='include-date' defaultChecked />
        </div>
      </div>
    </>
  );
};

export default Browser;
