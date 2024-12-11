import React from "react";
import ToolCard from "../../ToolCard";
import { Number } from "@/components/svgs";

const NumberSelector = () => {
  return <ToolCard text='Numbers' icon={<Number />} id={6} />;
};

export default NumberSelector;
