import React from "react";
import ToolCard from "../../ToolCard";
import { File } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";

const ImgSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Image' icon={<File />} id={5} />}
      isEmpty
      id='num212'
    />
  );
};

export default ImgSelector;
