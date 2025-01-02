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
        checked
      />
      <SavingInput />
      <SwitchToggle
        title='Add Date and URL'
        para='Note: When you enable Add Date & URL, the date and URL will appear at
          the top of your screenshots. This feature is available in Local mode.'
      />
    </div>
  );
};

export default Saving2;
