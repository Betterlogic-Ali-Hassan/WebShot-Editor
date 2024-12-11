import React from "react";
import ToolCard from "../../ToolCard";
import { Undo } from "@/components/svgs";

const UndoSelector = () => {
  return <ToolCard text='Undo' icon={<Undo />} />;
};

export default UndoSelector;
