import React from "react";
import { Radio } from "../Radio";
const settings = [
  {
    title: "Download Screenshot As",
    options: [
      { value: "JPG", label: "JPG" },
      { value: "PNG", label: "PNG" },
    ],
    defaultValue: "JPG",
  },
];
const SavingRadio = () => {
  return (
    <div className='border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727] mb-8'>
      {settings.map((setting) => (
        <Radio
          key={setting.title}
          title={setting.title}
          options={setting.options}
          defaultValue={setting.defaultValue}
        />
      ))}
    </div>
  );
};

export default SavingRadio;
