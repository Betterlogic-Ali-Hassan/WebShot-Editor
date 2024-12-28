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
  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text='Number' icon={selectedIcon} id={6} />}
      content={
        <Numbers onClick={handleSelection} selectedIcon={selectedIcon} />
      }
      id='num112s'
    />
  );
};

export default PenSelector;
