"use client";
import InputWithBtn from "@/components/editor/InputWithBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { settings } from "@/constant/screenShotSettingData";
import React from "react";
import ScreenSelect from "./ScreenSelect";
import { options } from "@/constant/ScreenShotOptions";

const ScreenShot = () => {
  const renderInputWithLabel = (label: string, unit: string, val: number) => (
    <div className='flex items-center justify-between pb-3'>
      <h3 className='text-[15px] flex flex-col'>{label}</h3>
      <InputWithBtn
        unit={unit}
        val={val}
        className='max-w-[100px]'
        InputWidth=' max-w-[28px]'
      />
    </div>
  );
  return (
    <div className='pt-6 '>
      <h4 className='text-base font-semibold uppercase border-b pb-3 mb-3'>
        Screenshot Preference
      </h4>
      {renderInputWithLabel("Delayed screenshot time (secs)", "s", 12)}
      {renderInputWithLabel("Page scrolling delay time (ms)", "ms", 12)}
      {renderInputWithLabel("Color depth filter (1 - disabled)", "px", 12)}
      <div>
        {settings.map((option, i) => (
          <div className='flex items-center gap-2 py-3' key={i}>
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
        ))}
      </div>
      <div className='text-sm italic'>
        <span className='flex items-center gap-2'>
          After clicking on the iconmake a screenshot{" "}
          <ScreenSelect trigger='Visible part of page ' items={options} />
        </span>
        <span className='flex items-center gap-2'>
          and then
          <ScreenSelect trigger='Visible part of page ' items={options} />
        </span>
      </div>
    </div>
  );
};

export default ScreenShot;
