"use client";
import { Resize } from "@/components/svgs";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Resizer from "./Resizer";
import { useState } from "react";

const ResizerSelector = () => {
  const [open, setOpen] = useState(false);
  const handleSelection = () => {
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Resize' icon={<Resize />} />}
      content={<Resizer onClick={handleSelection} />}
    />
  );
};

export default ResizerSelector;
