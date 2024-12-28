"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import { useState } from "react";
import Numbers from "./Numbers";
import { numbersData } from "@/constant/numbersData";

const PenSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    numbersData[0].icon
  );
  const [selectedText, setSelectedText] = useState<string>(numbersData[0].name);
  const handleSelection = (icon: React.ReactNode, text: string) => {
    setSelectedIcon(icon);
    setSelectedText(text);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text={selectedText} icon={selectedIcon} id={6} />}
      content={
        <Numbers onClick={handleSelection} selectedIcon={selectedIcon} />
      }
      id='num112s'
    />
  );
};

export default PenSelector;
