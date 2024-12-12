"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { options } from "@/constant/Lines";

export default function LinePicker() {
  return (
    <Select>
      <SelectTrigger className='min-w-[80px] border-0 '>
        <div className='flex flex-col items-center'>
          <SelectValue placeholder='2 px' />
          <div className=' bg-black w-[60px] h-[1.2px] ' />
        </div>
      </SelectTrigger>
      <SelectContent className='bg-white py-2 !px-0 '>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value.toString()}
            className='flex items-center gap-2 '
          >
            <span className='mb-1'>{option.label}</span>
            <div
              className=' bg-black w-[60px] '
              style={{ height: option.thickness }}
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
