"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import { useState } from "react";
import TextArrow from "./TextArrow";

import { arrowBox } from "@/constant/arrowBox";

const TextArrowSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    arrowBox[0].icon
  );
  const [selectedText, setSelectedText] = useState<string>(arrowBox[0].name);
  const handleSelection = (icon: React.ReactNode, text: string) => {
    setSelectedIcon(icon);
    setSelectedText(text);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text={selectedText} icon={selectedIcon} id={100} />}
      content={
        <TextArrow onClick={handleSelection} selectedIcon={selectedIcon} />
      }
      id='num100'
    />
  );
};

export default TextArrowSelector;
