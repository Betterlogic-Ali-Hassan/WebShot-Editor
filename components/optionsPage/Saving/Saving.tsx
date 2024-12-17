import React from "react";
import OptionPageSwitch from "../OptionPageSwitch";
import SavingRadio from "./SavingRadio";
import SavingInput from "./SavingInput";

const Saving = () => {
  return (
    <div className='pb-4'>
      <h4 className='text-base font-semibold mb-2 border-b border-[#00000026] pb-4 '>
        Saving Preferences
      </h4>
      <SavingRadio />
      <OptionPageSwitch
        label='Always get shareable links for screenshots uploaded to
      Google Drive'
      />
      <SavingInput />
      <div className='py-3'>
        <OptionPageSwitch label='Add Date and URL' className='py-0' />
        <p className='text-[13px] text-[#9AA0A6]  max-w-[80%]'>
          Note: When you enable Add Date & URL, the date and URL will appear at
          the top of your screenshots. This feature is available in Local mode.
        </p>
      </div>
    </div>
  );
};

export default Saving;
