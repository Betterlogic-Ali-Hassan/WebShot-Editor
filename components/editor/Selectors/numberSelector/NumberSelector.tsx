import React from "react";
import ToolDropdown from "@/components/ToolDropdown";
import ToolCard from "../../ToolCard";
import { Number } from "@/components/svgs";

const NumberSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Numbers' icon={<Number />} id={6} />}
      id='num43'
      isEmpty={true}
    />
  );
};

export default NumberSelector;
