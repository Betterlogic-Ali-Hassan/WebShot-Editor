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

  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text='Square' icon={selectedIcon} id={10} />}
      content={<Shapes onClick={handleSelection} selectedIcon={selectedIcon} />}
    />
  );
};

export default ShapeSelector;
