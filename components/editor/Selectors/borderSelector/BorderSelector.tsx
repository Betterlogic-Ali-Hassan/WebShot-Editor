import React from "react";
import ToolCard from "../../ToolCard";
import { Border } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import BrowserContent from "./BorderContent";

const BorderSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Border' icon={<Border />} />}
      content={<BrowserContent />}
    />
  );
};

export default BorderSelector;
