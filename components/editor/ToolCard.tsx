import React from "react";
import ToolDropdown from "../ToolDropdown";

interface ToolCardProps {
  icon: React.ReactNode;
  text: string;
  hasDropdown?: boolean;
  content?: React.ReactNode | React.ReactNode[];
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  text,
  hasDropdown = false,
  content,
}) => {
  const dropdownContent = Array.isArray(content)
    ? content
    : content
    ? [content]
    : [];

  const triggerElement = (
    <div className='flex items-center justify-center flex-col border border-border hover:bg-secondary cursor-pointer transition duration-300 h-[68px] w-[68px] rounded-[16px]'>
      <span>{icon}</span>
      <h4 className='mt-1.5 text-xs'>{text}</h4>
    </div>
  );

  return (
    <div className='tool'>
      {hasDropdown ? (
        <ToolDropdown
          trigger={triggerElement}
          dropdownContent={dropdownContent}
        />
      ) : (
        triggerElement
      )}
    </div>
  );
};

export default ToolCard;
