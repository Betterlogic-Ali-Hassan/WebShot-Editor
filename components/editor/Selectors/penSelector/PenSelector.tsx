import React from "react";
import ToolCard from "../../ToolCard";
import { Pen } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Brush from "./Brush";

const PenSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Pen' icon={<Pen />} />}
      content={<Brush />}
    />
  );
};

export default PenSelector;
