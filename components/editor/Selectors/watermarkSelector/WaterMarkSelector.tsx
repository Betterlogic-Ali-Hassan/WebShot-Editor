import React from "react";
import { LiaStampSolid } from "react-icons/lia";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import WatermarkContent from "./WaterMarkContent";

const WaterMarkSelector = () => {
  return (
    <ToolDropdown
      trigger={
        <ToolCard text='Watermark' icon={<LiaStampSolid size={24} />} id={15} />
      }
      content={<WatermarkContent />}
    />
  );
};

export default WaterMarkSelector;
