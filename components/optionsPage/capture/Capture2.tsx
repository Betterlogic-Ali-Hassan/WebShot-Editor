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
      <SwitchToggle
        title='Show in context menu'
        para="Toggle this setting to enable or disable the screenshot tool's option in the browser's context (right-click) menu."
      />
      {settings.map((setting) => (
        <CaptureSelect
          key={setting.title}
          title={setting.title}
          options={setting.options}
          defaultValue={setting.defaultValue}
          des={setting.des}
        />
      ))}

      <OptionSelect />
    </>
  );
};

export default Capture2;
