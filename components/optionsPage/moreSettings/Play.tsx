"use client";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import PlayCards from "./PlayCards";
import { cn } from "@/lib/utils";

const Play = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className='border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727]'>
      <div className='flex items-center justify-between font-medium'>
        <div className='py-2'>
          <h4>Play video on the page</h4>
          <p className='text-[#9A9A9A] mt-1 text-[13px] font-normal'>
            Turning on this option allows you to watch any Awesome Screenshot
            video with a shareable link right on the page you are on, in any of
            the following platforms, without jumping to a new tab. You can
            manage your platform preferences by checking or unchecking the
            checkboxes next to their names.
          </p>
        </div>
        <div className='ml-4'>
          <Switch checked={open} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-500 overflow-hidden max-h-0 opacity-0",
          open && "max-h-[500px] opacity-100"
        )}
      >
        <PlayCards />
      </div>
    </div>
  );
};

export default Play;
