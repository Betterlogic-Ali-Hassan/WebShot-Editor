"use client";

import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePopover } from "@/context/PopOverContext";
import { X } from "lucide-react";

interface Props {
  trigger: React.ReactNode;
  content?: React.ReactNode;
  id: string;
  isEmpty?: boolean;
}

const ToolDropdown = ({ trigger, content, id, isEmpty = false }: Props) => {
  const { openPopoverId, setOpenPopoverId } = usePopover();

  const isOpen = openPopoverId === id;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpenPopoverId(id);
    } else if (
      id === "num27" ||
      id === "num14" ||
      id === "num7" ||
      id === "num6" ||
      id === "num13" ||
      id === "num2"
    ) {
      setOpenPopoverId(null);
    }
  };

  const handleContentClick = () => {
    setOpenPopoverId(null);
  };

  const handleEmptyTriggerClick = () => {
    if (isEmpty) {
      setOpenPopoverId(null);
    }
  };

  useEffect(() => {
    if (id === "num42") {
      setOpenPopoverId(null);
    }
  }, [id, setOpenPopoverId]);

  if (isEmpty) {
    return <div onClick={handleEmptyTriggerClick}>{trigger}</div>;
  }

  // IDs ke liye cross icon na dikhana
  const shouldShowCrossIcon = !(
    id === "num27" ||
    id === "num14" ||
    id === "num7" ||
    id === "num6" ||
    id === "num13" ||
    id === "num2"
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger className='focus:outline-none'>{trigger}</PopoverTrigger>
      {content && (
        <PopoverContent
          className='bg-white max-h-[350px] overflow-y-auto scrollbar focus:outline-none relative'
          onClick={handleContentClick}
        >
          {content}
          {shouldShowCrossIcon && (
            <button
              className='absolute top-1 right-1 hover:bg-light  focus:outline-none'
              onClick={() => setOpenPopoverId(null)}
            >
              <X size={18} />
            </button>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default ToolDropdown;
