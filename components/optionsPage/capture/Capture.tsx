import React from "react";
import { Radio } from "../Radio";
import { settings } from "@/constant/settings";
// import OptionSelect from "../OptionSelect";
import SwitchToggle from "@/components/SwitchToogle";
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

      <div className=' border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727] '>
        {settings.map((setting) => (
          <Radio
            key={setting.title}
            title={setting.title}
            options={setting.options}
            defaultValue={setting.defaultValue}
          />
        ))}
      </div>
    </>
  );
};

export default Capture;
