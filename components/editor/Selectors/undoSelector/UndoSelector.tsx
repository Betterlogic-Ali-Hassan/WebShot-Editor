import React from "react";
import ToolCard from "../../ToolCard";
import { Undo } from "@/components/svgs";

const UndoSelector = () => {
  return <ToolCard text='Undo' icon={<Undo />} id={14} />;
};

export default UndoSelector;
