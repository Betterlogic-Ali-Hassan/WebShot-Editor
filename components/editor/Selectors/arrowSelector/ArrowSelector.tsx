import React from "react";
import ToolCard from "../../ToolCard";
import { Arrow } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Arrows from "./Arrows";

const ArrowSelector = () => {
  return (
    <>
      <ToolDropdown
        trigger={<ToolCard text='Arrows' icon={<Arrow />} />}
        content={<Arrows />}
      />
    </>
  );
};

export default ArrowSelector;
