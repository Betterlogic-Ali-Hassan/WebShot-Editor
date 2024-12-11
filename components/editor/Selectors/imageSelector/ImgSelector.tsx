import React from "react";
import ToolCard from "../../ToolCard";
import { File } from "@/components/svgs";

const ImgSelector = () => {
  return <ToolCard text='Image' icon={<File />} id={5} />;
};

export default ImgSelector;
