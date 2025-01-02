import React from "react";
import { settings } from "@/constant/settings";
import SwitchToggle from "@/components/SwitchToogle";
import CaptureSelect from "./CaptureSelect";
const Capture2 = () => {
  return (
    <>
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

export default Capture2;
