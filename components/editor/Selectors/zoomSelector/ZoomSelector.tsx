import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Zoom from "./Zoom";
import { ZoomIcon } from "@/components/svgs";

const ZoomSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Zoom' icon={<ZoomIcon />} id={16} />}
      content={<Zoom />}
      id='num14'
    />
  );
};

export default ZoomSelector;
