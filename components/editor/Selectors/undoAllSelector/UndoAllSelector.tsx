import React from "react";
import ToolCard from "../../ToolCard";
import { UndoAll } from "@/components/svgs";

const UndoAllSelector = () => {
  return <ToolCard text='UndoAll' icon={<UndoAll />} />;
};

export default UndoAllSelector;
