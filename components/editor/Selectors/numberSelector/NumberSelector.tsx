"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Numbers from "./Numbers";
import { Number } from "@/components/svgs";

const PenSelector = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Number' icon={<Number />} id={6} />}
      content={<Numbers />}
      id='num112s'
    />
  );
};

export default PenSelector;
