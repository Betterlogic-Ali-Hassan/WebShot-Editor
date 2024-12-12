import React from "react";
import ToolCard from "../../ToolCard";
import { BlurIcon } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";

const BlurSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Blur' icon={<BlurIcon />} id={2} />}
      isEmpty
      id='909'
    />
  );
};

export default BlurSelector;
