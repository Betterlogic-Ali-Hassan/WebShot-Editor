import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ToolCardProps {
  icon: React.ReactNode;
  text: string;
  id: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, text, id }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const handleSelect = (index: number) => {
    setSelectedCard((prev) => (prev === index ? null : index));
  };
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-col border border-border hover:bg-secondary cursor-pointer transition duration-300 h-[68px] w-[68px] rounded-[16px]",
        selectedCard === id && "border-2 border-dotted"
      )}
      onClick={() => handleSelect(id)}
    >
      <span>{icon}</span>
      <h4 className='mt-1.5 text-xs'>{text}</h4>
    </div>
  );
};

export default ToolCard;
