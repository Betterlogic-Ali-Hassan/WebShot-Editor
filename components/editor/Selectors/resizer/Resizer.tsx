"use client";
import React from "react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";

import InputWithBtn from "../../InputWithBtn";
import { Label } from "../../../ui/label";
interface Props {
  handleId: () => void;
}
const Resizer = ({ handleId }: Props) => {
  return (
    <div className='flex flex-col gap-3 px-4 py-2'>
      <div className='flex gap-4 items-center max-sm:flex-col  '>
        <div className='space-y-1 flex flex-col'>
          <Label className='text-sm font-medium text-foreground'>Width</Label>
          <InputWithBtn val={16} unit='px' />
        </div>
        <div className='space-y-1 flex flex-col'>
          <Label className='text-sm font-medium text-foreground'>Height</Label>
          <InputWithBtn val={16} unit='px' />
        </div>
        <div className='flex items-center gap-2 mt-2 sm:mt-[28px]'>
          <Checkbox id='checkbox' />
          <Label htmlFor='checkbox' className='cursor-pointer'>
            Proportional
          </Label>
        </div>
        <Button
          onClick={handleId}
          className='bg-black text-white  hover:bg-black/80 mt-4 sm:mt-7 max-sm:w-full'
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default Resizer;
