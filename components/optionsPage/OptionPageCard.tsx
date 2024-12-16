import React from "react";
import OptionsTabs from "./OptionsTabs";
import OptionSelect from "./OptionSelect";
import { settings } from "@/constant/settings";
import { Radio } from "./Radio";
import Record from "./Record/Record";
import Saving from "./Saving/Saving";
import MoreSetting from "./moreSettings/MoreSetting";

const OptionPageCard = () => {
  return (
    <div className='py-6 px-6 rounded-[24px] border-[#d5d5d5] optionCardShadow border-[0.5px]'>
      <OptionsTabs />
      <h4 className='text-[15px] font-semibold '>Capture Preferences</h4>
      <OptionSelect />
      {settings.map((setting) => (
        <Radio
          key={setting.title}
          title={setting.title}
          options={setting.options}
          defaultValue={setting.defaultValue}
        />
      ))}
      <div className='mt-6'>
        <h4 className='text-[15px] font-semibold mb-2'>Record Preferences</h4>
        <Record />
      </div>
      <Saving />
      <MoreSetting />
    </div>
  );
};

export default OptionPageCard;
