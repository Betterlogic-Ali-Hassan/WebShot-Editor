import React from "react";
import ToolCard from "../../ToolCard";
import { Screen } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Shapes from "./Shapes";

const ShapeSelector = () => {
  return (
    <ToolDropdown
      trigger={
        <ToolCard text='Square' icon={<Screen height={24} width={24} />} />
      }
      content={<Shapes />}
    />
  );
};

export default ShapeSelector;
