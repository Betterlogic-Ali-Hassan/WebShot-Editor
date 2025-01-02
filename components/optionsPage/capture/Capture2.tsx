import React from "react";
import { settings } from "@/constant/settings";
import SwitchToggle from "@/components/SwitchToogle";
import CaptureSelect from "./CaptureSelect";
import OptionSelect from "../OptionSelect";
import ScreenShot from "@/components/option2Page/OptionsSetting/screenshot/ScreenShot";
const Capture2 = () => {
  return (
    <>
      <ScreenShot />
      <SwitchToggle title='Show in context menu' />
      <SwitchToggle title='Show in context menu' checked />

      {settings.map((setting) => (
        <CaptureSelect
          key={setting.title}
          title={setting.title}
          options={setting.options}
          defaultValue={setting.defaultValue}
        />
      ))}
      <div className='border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727] mb-8'>
        <OptionSelect />
      </div>
    </>
  );
};

export default Capture2;
