"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Export } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import { useState } from "react";
import ExportContent from "./ExportContent";

const ExportSelector = () => {
  const [open, setOpen] = useState(false);
  const handleSelection = () => {
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Export As' icon={<Export />} id={18} />}
      content={<ExportContent onClick={handleSelection} />}
    />
  );
};

export default ExportSelector;
