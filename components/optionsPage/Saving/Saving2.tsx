"use client";
import React from "react";

import SavingRadio from "./SavingRadio";
import SavingInput from "./SavingInput";
import SwitchToggle from "@/components/SwitchToogle";
import SavingScreenShot from "./SavingScreenShot";

const Saving2 = () => {
  return (
    <div className='pt-3'>
      <SavingScreenShot />
      <SavingRadio />
      <SwitchToggle
        title='Always get shareable links for screenshots uploaded to
      Google Drive'
        para='Automatically generate shareable links for screenshots uploaded to Google Drive, enabling quick and easy sharing with others.
'
        checked
      />
      <SavingInput />
      <SwitchToggle
        title='Add Date and URL'
        para='Include the date and URL at the top of your screenshots for reference. This feature is available in Local mode and is useful for providing additional context to your captures.'
      />
    </div>
  );
};

export default Saving2;
