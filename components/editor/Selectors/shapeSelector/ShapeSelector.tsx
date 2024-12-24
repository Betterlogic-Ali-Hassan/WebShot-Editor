"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Screen } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Shapes from "./Shapes";
import { useState } from "react";

const ShapeSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <Screen height={24} width={24} />
  );
  const [selectedText, setSelectedText] = useState<string>("Pen");
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
