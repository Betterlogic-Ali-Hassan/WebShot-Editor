import React from "react";
import ToolCard from "../../ToolCard";
import { UndoAll } from "@/components/svgs";

const UndoAllSelector = () => {
  return <ToolCard text='UndoAll' icon={<UndoAll />} id={13} />;
};

export default UndoAllSelector;
