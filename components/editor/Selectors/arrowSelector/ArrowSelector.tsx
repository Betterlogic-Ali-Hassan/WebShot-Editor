"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Arrow } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Arrows from "./Arrows";
import { useState } from "react";

const ArrowSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<Arrow />);
  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text='Arrows' icon={selectedIcon} id={1} />}
      content={<Arrows onClick={handleSelection} selectedIcon={selectedIcon} />}
    />
  );
};

export default ArrowSelector;
