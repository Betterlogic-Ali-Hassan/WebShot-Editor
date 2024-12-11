"use client";

import * as React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FontCounter() {
  const [value, setValue] = React.useState(36);

  const decrement = () => {
    setValue((prev) => Math.max(0, prev - 1));
  };

  const increment = () => {
    setValue((prev) => prev + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setValue(Math.max(0, newValue));
    }
  };

  return (
    <div className='flex items-center w-[150px] bg-white border border-border rounded-md shadow-sm'>
      <Button
        variant='ghost'
        size='icon'
        onClick={decrement}
        className='h-10 w-10 rounded-r-none rounded-l-md border-r border-border hover:bg-secondary'
      >
        <MinusIcon className='h-4 w-4 ' />
        <span className='sr-only'>Decrease</span>
      </Button>
      <div className='relative flex-1'>
        <Input
          type='number'
          value={value}
          onChange={handleChange}
          className='h-10 w-full border-0 text-right pr-8 focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm  pointer-events-none'>
          px
        </span>
      </div>
      <Button
        variant='ghost'
        size='icon'
        onClick={increment}
        className='h-10 w-10 rounded-l-none rounded-r-md border-l border-border hover:bg-secondary'
      >
        <PlusIcon className='h-4 w-4 text-gray-500' />
        <span className='sr-only'>Increase</span>
      </Button>
    </div>
  );
}
