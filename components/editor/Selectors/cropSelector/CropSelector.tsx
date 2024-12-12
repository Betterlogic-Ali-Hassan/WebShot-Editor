import React from "react";
import ToolCard from "../../ToolCard";
import { Crop } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";

const CropSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Crop' icon={<Crop />} id={4} />}
      isEmpty
      id='804'
    />
  );
};

export default CropSelector;
