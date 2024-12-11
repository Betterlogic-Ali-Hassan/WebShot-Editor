import React from "react";
import ToolCard from "../../ToolCard";
import { Crop } from "@/components/svgs";

const CropSelector = () => {
  return <ToolCard text='Crop' icon={<Crop />} />;
};

export default CropSelector;
