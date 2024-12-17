"use client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import KeySelect from "./Saving/KeySelect";

const radioOptions = [
  { name: "Visible Part", id: 0 },
  { name: "Selected Area", id: 1 },
  { name: "Full Page", id: 2 },
];

export default function OptionSelect() {
  return (
    <div className='pb-3 pt-0'>
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
          <KeySelect option={option} />
        </div>
      ))}
    </div>
  );
}
