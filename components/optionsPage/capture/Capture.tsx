import React from "react";
import { Radio } from "../Radio";
import { settings } from "@/constant/settings";
import OptionSelect from "../OptionSelect";

const Capture = () => {
  return (
    <div className='pt-5'>
      <div className='border-b border-[#00000026]'>
        <OptionSelect />
      </div>
      <div className='pt-2 '>
        {settings.map((setting) => (
          <Radio
            key={setting.title}
            title={setting.title}
            options={setting.options}
            defaultValue={setting.defaultValue}
          />
        ))}
      </div>
    </div>
  );
};

export default Capture;
