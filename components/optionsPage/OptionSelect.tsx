"use client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import { settings } from "@/constant/screenShotSettingData";

export default function OptionSelect() {
  return (
    <div className='pb-3 pt-0'>
      {settings.slice(3).map((option, id) => (
        <div key={id} className=' flex items-center justify-between'>
          <div className='flex items-center gap-2 py-3'>
            <Checkbox
              className='rounded-full h-5 w-5 '
              defaultChecked
              value={option.name}
              id={option.name}
            />
            <Label htmlFor={option.name} className='text-[15px]'>
              {option.name}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
}
