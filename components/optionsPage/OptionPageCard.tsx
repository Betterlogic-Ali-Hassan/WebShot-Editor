import React from "react";
import OptionsTabs from "./OptionsTabs";
import OptionPageSwitch from "./OptionPageSwitch";
import OptionSelect from "./OptionSelect";

const OptionPageCard = () => {
  return (
    <div className='pt-6 px-6 rounded-[24px] border-[#d5d5d5] optionCardShadow border-[0.5px]'>
      <OptionsTabs />
      <OptionPageSwitch />
      <OptionSelect />
    </div>
  );
};

export default OptionPageCard;
