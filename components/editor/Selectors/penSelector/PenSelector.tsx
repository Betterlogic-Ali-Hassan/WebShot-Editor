"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Brush from "./Brush";
import { useState } from "react";
import { brushData } from "@/constant/PencilData";

const PenSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    brushData[0].icon
  );
  const [selectedText, setSelectedText] = useState<string>(brushData[0].name);
  const handleSelection = (icon: React.ReactNode, text: string) => {
    setSelectedIcon(icon);
    setSelectedText(text);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text={selectedText} icon={selectedIcon} id={7} />}
      content={<Brush onClick={handleSelection} selectedIcon={selectedIcon} />}
      id='num4'
    />
  );
};

export default PenSelector;
