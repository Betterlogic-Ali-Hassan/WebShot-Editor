"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Revision as RevisionIcon } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import { useState } from "react";
import Revision from "./Revision";

const RevisionContent = () => {
  const [open, setOpen] = useState(false);
  const handleSelection = (icon: React.ReactNode) => {
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Revision' icon={<RevisionIcon />} id={17} />}
      content={<Revision onClick={handleSelection} />}
    />
  );
};

export default RevisionContent;
