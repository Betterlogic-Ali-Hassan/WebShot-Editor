"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Export } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import ExportContent from "./ExportContent";

const ExportSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Export As' icon={<Export />} id={18} />}
      content={<ExportContent />}
      id='num27'
    />
  );
};

export default ExportSelector;
