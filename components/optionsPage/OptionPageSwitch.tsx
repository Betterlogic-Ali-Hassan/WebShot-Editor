import React from "react";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

const OptionPageSwitch = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className='flex items-center pr-3'>
        <span className='text-[15px]'>{label}</span>
      </div>
      <Switch id='switch-01' />
    </div>
  );
};

export default OptionPageSwitch;
