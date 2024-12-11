"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Text } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Fonts from "./Fonts";
import { useState } from "react";

const TextSelector = () => {
  const [open, setOpen] = useState(false);
  const handleSelection = () => {
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Text' icon={<Text />} />}
      content={<Fonts onClick={handleSelection} />}
    />
  );
};

export default TextSelector;
