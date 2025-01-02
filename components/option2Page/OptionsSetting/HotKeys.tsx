"use client";
import React from "react";
import { optionsKey } from "@/constant/ScreenShotKey";
import KeySelect from "@/components/optionsPage/Saving/KeySelect";
import { EditPage } from "@/components/svgs";
import { Label } from "@/components/ui/label";
import ScreenSelect from "./screenshot/ScreenSelect";
import { options } from "@/constant/ScreenShotOptions";
const HotKeys = () => {
  return (
    <>
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
      <div className='text-sm italic pt-3'>
        <span className='flex items-center gap-2'>
          After clicking on the iconmake a screenshot{" "}
          <ScreenSelect trigger='Visible part of page ' items={options} />
        </span>
        <span className='flex items-center gap-2'>
          and then
          <ScreenSelect trigger='Visible part of page ' items={options} />
        </span>
      </div>
    </>
  );
};

export default HotKeys;
