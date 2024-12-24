"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Arrow } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Arrows from "./Arrows";
import { useState } from "react";

const ArrowSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<Arrow />);
  const [selectedText, setSelectedText] = useState<string>("Arrow Line");
  const handleSelection = (icon: React.ReactNode, text: string) => {
    setSelectedIcon(icon);
    setSelectedText(text);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text={selectedText} icon={selectedIcon} id={1} />}
      content={<Arrows onClick={handleSelection} selectedIcon={selectedIcon} />}
      id='num1'
    />
  );
};

export default ArrowSelector;
