"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Arrow } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Arrows from "./Arrows";
import { useState } from "react";

const ArrowSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <Arrow height={20} width={20} />
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
      trigger={<ToolCard text='Arrows' icon={selectedIcon} />}
      content={<Arrows onClick={handleSelection} />}
    />
  );
};

export default ArrowSelector;
