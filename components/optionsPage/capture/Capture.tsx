import React from "react";
import { settings } from "@/constant/settings";
// import OptionSelect from "../OptionSelect";
import SwitchToggle from "@/components/SwitchToogle";
import CaptureSelect from "./CaptureSelect";
// import ScreenSelect from "@/components/option2Page/OptionsSetting/screenshot/ScreenSelect";
// import { options } from "@/constant/ScreenShotOptions";
const Capture = () => {
  return (
    <>
      {/* <div className='border-b border-[#00000026]'>
        <OptionSelect />
        <div className='text-sm italic pb-3'>
          <span className='flex items-center gap-2'>
            After clicking on the iconmake a screenshot{" "}
            <ScreenSelect trigger='Visible part of page ' items={options} />
          </span>
          <span className='flex items-center gap-2'>
            and then
            <ScreenSelect trigger='Visible part of page ' items={options} />
          </span>
        </div>
      </div> */}
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
    </>
  );
};

export default Capture;
