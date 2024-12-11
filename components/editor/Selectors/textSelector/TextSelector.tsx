import React from "react";
import ToolCard from "../../ToolCard";
import { Text } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Fonts from "./Fonts";

const TextSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Text' icon={<Text />} />}
      content={<Fonts />}
    />
  );
};

export default TextSelector;
