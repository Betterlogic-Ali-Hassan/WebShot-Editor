import MoreSetting from "@/components/optionsPage/moreSettings/MoreSetting";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import Saving from "@/components/optionsPage/Saving/Saving";
import React from "react";

const page = () => {
  return (
    <OptionPageCard>
      <Saving />
      <MoreSetting />
    </OptionPageCard>
  );
};

export default page;
