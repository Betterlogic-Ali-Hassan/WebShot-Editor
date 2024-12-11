import React from "react";

interface ToolCardProps {
  icon: React.ReactNode;
  text: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, text }) => {
  return (
    <div className='flex items-center justify-center flex-col border border-border hover:bg-secondary cursor-pointer transition duration-300 h-[68px] w-[68px] rounded-[16px]'>
      <span>{icon}</span>
      <h4 className='mt-1.5 text-xs'>{text}</h4>
    </div>
  );
};

export default ToolCard;
