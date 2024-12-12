"use client";
import React from "react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";

import InputWithBtn from "../../InputWithBtn";
import { Label } from "../../../ui/label";
interface Props {
  onClick: () => void;
}
const Resizer = ({ onClick }: Props) => {
  return (
    <div className='flex flex-col gap-3 px-4 py-2'>
      <div className='flex gap-4 items-center'>
        <InputWithBtn text='Width' />
        <InputWithBtn text='Height' />
        <div className='flex items-center gap-2 mt-[28px]'>
          <Checkbox id='checkbox' />
          <Label htmlFor='checkbox' className='cursor-pointer'>
            Proportional
          </Label>
        </div>
        <Button
          className='bg-black text-white  hover:bg-black/80 mt-7'
          onClick={onClick}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default Resizer;
