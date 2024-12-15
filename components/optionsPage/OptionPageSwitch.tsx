import React from "react";
import { Switch } from "../ui/switch";
import { Lock } from "lucide-react";

const OptionPageSwitch = () => {
  return (
    <div className='flex items-center justify-between py-3'>
      <div className='flex items-center pr-3'>
        <Lock size={20} />
        <span className='pl-3 text-[15px]'>Private profile</span>
      </div>
      <Switch id='switch-01' />
    </div>
  );
};

export default OptionPageSwitch;
