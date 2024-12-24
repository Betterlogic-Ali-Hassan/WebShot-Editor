"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { ArrowBox } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import { useState } from "react";
import TextArrow from "./TextArrow";

const TextArrowSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <ArrowBox />
  );
  const [selectedText, setSelectedText] = useState<string>("Text Box");
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
