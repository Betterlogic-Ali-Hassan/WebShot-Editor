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
    <div className='py-6 px-6 rounded-t-[24px] border-[#d5d5d5] optionCardShadow border-[0.5px]'>
      <OptionsTabs />
      <h4 className='text-base font-semibold border-b border-[#00000026] pb-4'>
        Capture Preferences
      </h4>
      <div className='border-b border-[#00000026]'>
        <OptionSelect />
      </div>
      <div className='py-2 border-b border-[#00000026]'>
        {settings.map((setting) => (
          <Radio
            key={setting.title}
            title={setting.title}
            options={setting.options}
            defaultValue={setting.defaultValue}
          />
        ))}
      </div>

      <div className=' border-b border-[#00000026] pb-4'>
        <h4 className='text-base font-semibold mb-2 border-b border-[#00000026] py-4 '>
          Record Preferences
        </h4>
        <Record />
      </div>
      <Saving />
      <MoreSetting />
    </div>
  );
};

export default OptionPageCard;
