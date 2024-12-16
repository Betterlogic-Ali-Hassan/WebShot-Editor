"use client";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import PlayCards from "./PlayCards";
import { cn } from "@/lib/utils";

const Play = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='py-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center pr-3'>
          <span className='text-[15px]'>Play video on the page</span>
        </div>
        <Switch checked={open} onClick={() => setOpen(!open)} />
      </div>
      <p className='text-[#9AA0A6] text-[13px] max-w-[80%]'>
        Turning on this option allows you to watch any Awesome Screenshot video
        with a shareable link right on the page you are on, in any of the
        following platforms, without jumping to a new tab. You can manage your
        platform preferences by checking or unchecking the checkboxes next to
        their names.
      </p>
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
