"use client";
import React from "react";
import ToolCard from "../../ToolCard";
import { Revision as RevisionIcon } from "@/components/svgs";
import ToolDropdown from "@/components/ToolDropdown";
import Revision from "./Revision";

const RevisionContent = () => {
  return (
    <ToolDropdown
      trigger={<ToolCard text='Revision' icon={<RevisionIcon />} id={17} />}
      content={<Revision />}
      id='num7'
    />
  );
};

export default RevisionContent;
