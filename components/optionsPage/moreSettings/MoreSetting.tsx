import React from "react";
import SettingRadio from "./SettingRadio";
import OptionPageSwitch from "../OptionPageSwitch";
import Play from "./Play";

const MoreSetting = () => {
  return (
    <>
      <h4 className='text-lg font-semibold  pb-3 border-b  border-[#00000026]'>
        Settings
      </h4>
      <div className='pt-2'>
        <SettingRadio />
        <OptionPageSwitch label="Turn on dark mode for the extension's popup menu" />
        <OptionPageSwitch label='Show in context menu' />
        <OptionPageSwitch label='Show the extension icon in the compose window of Gmail in order to add a screenshot' />
        <OptionPageSwitch label='Resize a screenshot to 50% of its original size for Retina screen' />
        <Play />
      </div>
    </>
  );
};

export default MoreSetting;
