"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const SavingInput = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <div className='py-3'>
      <div className='flex items-center justify-between '>
        <div className='flex items-center pr-3'>
          <span className='text-[15px]'>
            Ask where to save each file before downloading
          </span>
        </div>
        <Switch checked={disabled} onClick={() => setDisabled(!disabled)} />
      </div>
      <p className='text-[#9AA0A6] text-[13px] max-w-[80%]'>
        Note: to use this feature, you need to Allow the extension to manage
        Downloads when permission request window pops up. And only when this
        option is turned on, can you specify default subfolder to save
        screenshots to your local disk. Defaults to the Downloads folder if you
        don’t specify a subfolder.
      </p>
      <div
        className={cn(
          "border rounded-sm flex items-center overflow-hidden mt-3 border-[#999]",
          !disabled && "border-[#ccc] text-[#999]"
        )}
      >
        <span className='px-3 bg-secondary border-r h-10 flex items-center justify-center text-sm border-[#999] '>
          Download/
        </span>
        <Input
          className='bg-transparent border-0 shadow-none outline-none px-3'
          placeholder='e.g WebShotScreenshot'
          disabled={!disabled}
        />
      </div>
    </div>
  );
};

export default SavingInput;
