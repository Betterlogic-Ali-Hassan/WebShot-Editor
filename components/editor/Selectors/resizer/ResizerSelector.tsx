"use client";
import { Resize } from "@/components/svgs";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Resizer from "./Resizer";

const ResizerSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Resize' icon={<Resize />} id={9} />}
      content={<Resizer />}
      id='num6'
    />
  );
};

export default ResizerSelector;
