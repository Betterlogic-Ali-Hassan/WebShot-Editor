"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Pen } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Brush from "./Brush";
import { useState } from "react";

const PenSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<Pen />);
  const [selectedText, setSelectedText] = useState<string>("Pencil");
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
