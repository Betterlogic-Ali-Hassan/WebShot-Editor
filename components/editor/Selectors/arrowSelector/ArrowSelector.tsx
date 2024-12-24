"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Arrows from "./Arrows";
import { useState } from "react";
import { arrows } from "@/constant/arrows";

const ArrowSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    arrows[0].icon
  );
  const [selectedText, setSelectedText] = useState<string>(arrows[0].name);
  const handleSelection = (icon: React.ReactNode, text: string) => {
    setSelectedIcon(icon);
    setSelectedText(text);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text={selectedText} icon={selectedIcon} id={1} />}
      content={
        <Arrows
          onClick={handleSelection}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      }
      id='num1'
    />
  );
};

export default ArrowSelector;
