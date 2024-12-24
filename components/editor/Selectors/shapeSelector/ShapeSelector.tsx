"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Shapes from "./Shapes";
import { useState } from "react";
import { shapesData } from "@/constant/shapeData";

const ShapeSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    shapesData[0].icon
  );
  const [selectedText, setSelectedText] = useState<string>(shapesData[0].name);
  const handleSelection = (icon: React.ReactNode, text: string) => {
    setSelectedIcon(icon);
    setSelectedText(text);
  };

  return (
    <ToolDropdown
      trigger={<ToolCard text={selectedText} icon={selectedIcon} id={10} />}
      content={<Shapes onClick={handleSelection} selectedIcon={selectedIcon} />}
      id='num9'
    />
  );
};

export default ShapeSelector;
