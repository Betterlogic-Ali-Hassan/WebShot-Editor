"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Drop } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Blurs from "./Blurs";
import { useState } from "react";

const BlurSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<Drop />);
  const [open, setOpen] = useState(false);
  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Blur' icon={selectedIcon} />}
      content={<Blurs onClick={handleSelection} />}
    />
  );
};

export default BlurSelector;
