"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { fontSizes } from "@/constant/fontSize";

export default function NumberSelector() {
  const [value, setValue] = useState(8);

  const increment = () => {
    setValue((prev) => prev + 1);
  };

  const decrement = () => {
    setValue((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className='inline-flex items-center'>
      <Button
        variant='outline'
        size='icon'
        className='h-9 rounded-none rounded-l-md border-r-0 bg-select'
        onClick={decrement}
      >
        <Minus className='h-4 w-4' />
      </Button>
      <Select
        value={value.toString()}
        onValueChange={(val) => setValue(parseInt(val))}
      >
        <SelectTrigger className='h-9 w-[72px] rounded-none border-l border-r border-t-0 border-b-0 px-2 [&>span]:mx-auto [&>svg]:hidden border-border'>
          <SelectValue>{value}</SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-bg'>
          {fontSizes.map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant='outline'
        size='icon'
        className='h-9 rounded-none rounded-r-md border-l-0 bg-select'
        onClick={increment}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
}
