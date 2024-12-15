"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { options } from "@/constant/SelectKeysData";
import { Checkbox } from "../ui/checkbox";

const radioOptions = [
  { name: "Visible Part", id: 0 },
  { name: "Selected Area", id: 1 },
  { name: "Full Page", id: 2 },
];

export default function OptionSelect() {
  const [selectedValues, setSelectedValues] = useState<string[]>([
    "1",
    "A",
    "Z",
  ]);

  const handleSelectChange = (value: string, index: number) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = value;
    setSelectedValues(newSelectedValues);
  };

  const isOptionDisabled = (value: string, currentIndex: number) => {
    return selectedValues.some(
      (selectedValue, index) =>
        selectedValue === value && index !== currentIndex
    );
  };

  return (
    <div className='py-3'>
      {radioOptions.map((option) => (
        <div key={option.id} className=' flex items-center justify-between'>
          <div className='flex items-center gap-2 py-3'>
            <Checkbox
              className='rounded-full h-5 w-5'
              defaultChecked
              value={option.name}
              id={option.name}
            />
            <Label htmlFor={option.name} className='text-[15px]'>
              {option.name}
            </Label>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-[15px]'>Ctrl + Shift +</span>
            <Select
              value={selectedValues[option.id]}
              onValueChange={(value) => handleSelectChange(value, option.id)}
            >
              <SelectTrigger className='w-14 h-8'>
                <SelectValue placeholder={option.id + 1} />
              </SelectTrigger>
              <SelectContent className='max-h-[300px]'>
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={isOptionDisabled(opt.value, option.id)}
                  >
                    {opt.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
}
