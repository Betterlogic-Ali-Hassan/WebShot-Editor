import React from "react";
import ToolCard from "../../ToolCard";
import { Drop } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Blurs from "./Blurs";

const BlurSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Blur' icon={<Drop />} />}
      content={<Blurs />}
    />
  );
};

export default BlurSelector;
