"use client";
import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const Resizer = () => {
  return (
    <div className='flex flex-col gap-2 p-4'>
      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <h4>Width</h4>
          <Input className='max-w-[120px]' placeholder='100px' />
        </div>
        <div className='flex flex-col gap-2'>
          <h4>Height</h4>
          <Input className='max-w-[120px]' placeholder='100px' />
        </div>
        <Button className='bg-black text-white  hover:bg-black/80 mt-7'>
          Change
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox />
        <label>Proportional</label>
      </div>
    </div>
  );
};

export default Resizer;
