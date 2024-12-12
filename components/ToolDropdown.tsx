"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePopover } from "@/context/PopOverContext";
import React from "react";

interface Props {
  trigger: React.ReactNode;
  content: React.ReactNode;
  id: string;
}
const ToolDropdown = ({ trigger, content, id }: Props) => {
  const { openPopoverId, setOpenPopoverId } = usePopover();

  const isOpen = openPopoverId === id;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpenPopoverId(id);
    }
  };
  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger className='focus:outline-none'>{trigger}</PopoverTrigger>
      <PopoverContent className='bg-white max-h-[350px] overflow-y-auto scrollbar  focus:outline-none'>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ToolDropdown;
