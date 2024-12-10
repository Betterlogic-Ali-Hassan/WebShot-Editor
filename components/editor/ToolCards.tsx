import { tools } from "@/constant/Tools";
import React from "react";
import ToolCard from "./ToolCard";

const ToolCards = () => {
  return (
    <header className='flex items-center justify-center py-4 bg-white border-b border-border shadow-sm'>
      <div className='flex items-center gap-6'>
        {tools.map((tool, i) => (
          <ToolCard key={i} text={tool.name} icon={tool.icon} />
        ))}
      </div>
    </header>
  );
};

export default ToolCards;
