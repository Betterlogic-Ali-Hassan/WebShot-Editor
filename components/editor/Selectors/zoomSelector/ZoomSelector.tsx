import React from "react";
import ToolCard from "../../ToolCard";
import { ZoomIn } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Zoom from "./Zoom";

const ZoomSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Zoom' icon={<ZoomIn />} id={16} />}
      content={<Zoom />}
      id='num14'
    />
  );
};

export default ZoomSelector;
