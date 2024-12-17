"use client";
import React from "react";
import { optionsKey } from "@/constant/ScreenShotKey";
import KeySelect from "@/components/optionsPage/Saving/KeySelect";
import { EditPage } from "@/components/svgs";
import { Label } from "@/components/ui/label";
const HotKeys = () => {
  return (
    <div className='pt-6'>
      <h4 className='text-base font-semibold uppercase border-b pb-3'>
        Hot Keys
      </h4>
      <div className='pt-3'>
        {optionsKey.map((item) => (
          <div key={item.id} className=' flex items-center justify-between '>
            <Label htmlFor={item.name} className='text-[15px] py-3'>
              {item.name}
            </Label>
            {item.selected === true ? (
              <KeySelect option={item} />
            ) : (
              <span className='text-[15px] flex items-center gap-1 '>
                Ctrl + Shift + 7{" "}
                <a href='#' className='w-[52px]'>
                  <EditPage />
                </a>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotKeys;
