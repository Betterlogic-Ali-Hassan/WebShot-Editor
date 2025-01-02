"use client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import { settings } from "@/constant/screenShotSettingData";

export default function OptionSelect() {
  return (
    <div className='pb-3 pt-0'>
      {settings.slice(3).map((option, id) => (
        <div key={id} className=' flex items-center justify-between'>
          <div className='flex items-center gap-4 py-[14px]'>
            <Checkbox
              className='rounded-full h-5 w-5 '
              defaultChecked
              value={option.name}
              id={option.name}
            />
            <div>
              <Label htmlFor={option.name}>{option.name}</Label>
              <p className='text-[#9A9A9A] mt-0.5  text-[13px] font-normal'>
                {option.des}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
