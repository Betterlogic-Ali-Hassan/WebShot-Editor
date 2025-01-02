import React from "react";
import Play from "./Play";
import SwitchToggle from "@/components/SwitchToogle";

const MoreSetting = () => {
  return (
    <>
      <SwitchToggle title="Turn on dark mode for the extension's popup menu" />
      <SwitchToggle title='Show the extension icon in the compose window of Gmail in order to add a screenshot' />
      <Play />
    </>
  );
};

export default MoreSetting;
