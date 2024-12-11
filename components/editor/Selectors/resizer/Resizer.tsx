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
    <div className='flex flex-col gap-2 p-4'>
      <div className='flex gap-4 items-center'>
        <InputWithBtn text='Width' />
        <InputWithBtn text='Height' />
        <Button
          className='bg-black text-white  hover:bg-black/80 mt-7'
          onClick={onClick}
        >
          Change
        </Button>
      </div>
      <div className='flex items-center gap-2 pt-2'>
        <Checkbox id='checkbox' />
        <Label htmlFor='checkbox' className='cursor-pointer'>
          Proportional
        </Label>
      </div>
    </div>
  );
};

export default Resizer;
