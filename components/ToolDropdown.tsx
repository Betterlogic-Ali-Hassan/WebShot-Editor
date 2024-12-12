"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePopover } from "@/context/PopOverContext";

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
    } else if (id === "num27" || id === "num7") {
      setOpenPopoverId(null);
    }
  };

  const handleContentClick = () => {
    if (id === "num27" || id === "num7") {
      setOpenPopoverId(null);
    }
  };
  useEffect(() => {
    if (id === "num42") {
      setOpenPopoverId(null);
    }
  }, [id]);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger className='focus:outline-none'>{trigger}</PopoverTrigger>
      <PopoverContent
        className='bg-white max-h-[350px] overflow-y-auto scrollbar focus:outline-none'
        onClick={handleContentClick}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ToolDropdown;
