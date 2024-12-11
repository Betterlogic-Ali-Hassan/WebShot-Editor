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

  const [open, setOpen] = useState(false);
  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Square' icon={selectedIcon} />}
      content={<Shapes onClick={handleSelection} />}
    />
  );
};

export default ShapeSelector;
