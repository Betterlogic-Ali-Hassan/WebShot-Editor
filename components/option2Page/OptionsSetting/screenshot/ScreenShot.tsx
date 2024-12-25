"use client";
import InputWithBtn from "@/components/editor/InputWithBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { settings } from "@/constant/screenShotSettingData";
import React from "react";
import ScreenSelect from "./ScreenSelect";
import { options } from "@/constant/ScreenShotOptions";

const ScreenShot = () => {
  return (
    <div className='pt-6'>
      <h4 className='text-base font-semibold uppercase border-b pb-3'>
        Screenshot Preference
      </h4>
      <div className='flex items-center justify-between py-3'>
        <h3 className='text-[15px] flex flex-col'>
          Delayed screenshot time (secs)
        </h3>
        <InputWithBtn
          unit='s'
          val={2}
          className='max-w-[80px]'
          InputWidth='max-w-[22px]'
        />
      </div>
      <div className='flex items-center justify-between  pb-3'>
        <h3 className='text-[15px] flex flex-col'>
          Page scrolling delay time (ms)
        </h3>
        <InputWithBtn
          unit='ms'
          val={2}
          className='max-w-[80px]'
          InputWidth='max-w-[22px]'
        />
      </div>
      <div className='flex items-center justify-between  pb-3'>
        <h3 className='text-[15px] flex flex-col'>
          Color depth filter (1 - disabled)
        </h3>
        <InputWithBtn
          unit='px'
          val={2}
          className='max-w-[80px]'
          InputWidth='max-w-[22px]'
        />
      </div>
      <div>
        {settings.map((option, i) => (
          <div className='flex items-center gap-2 py-3' key={i}>
            <Checkbox
              className='rounded-full h-5 w-5'
              defaultChecked
              value={option.option}
              id={option.option}
            />
            <Label htmlFor={option.option} className='text-[15px]'>
              {option.option}
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
