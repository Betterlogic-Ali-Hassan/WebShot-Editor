"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Pen } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Brush from "./Brush";
import { useState } from "react";

const PenSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<Pen />);
  const [open, setOpen] = useState(false);
  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Pen' icon={selectedIcon} id={7} />}
      content={<Brush onClick={handleSelection} selectedIcon={selectedIcon} />}
    />
  );
};

export default PenSelector;
