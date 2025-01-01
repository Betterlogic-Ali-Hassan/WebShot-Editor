import React from "react";
import OptionPageSwitch from "../OptionPageSwitch";
import Play from "./Play";

const MoreSetting = () => {
  return (
    <>
      <div className='pt-2'>
        <OptionPageSwitch label="Turn on dark mode for the extension's popup menu" />
        <OptionPageSwitch label='Show the extension icon in the compose window of Gmail in order to add a screenshot' />
        <Play />
      </div>
    </>
  );
};

export default MoreSetting;
