import React from "react";
import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TooltipProps {
  trigger?: React.ReactNode;
  content: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ trigger, content, children }) => (
  <TooltipProvider delayDuration={200}>
    <TooltipBase>
      <TooltipTrigger>
        {children ? (
          children
        ) : (
          <div className='flex items-center justify-center h-9 w-9 rounded-full hover:bg-light'>
            {trigger}
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent className='bg-white'>{content}</TooltipContent>
    </TooltipBase>
  </TooltipProvider>
);

export default Tooltip;
