"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  trigger: React.ReactNode;
  content: React.ReactNode;
}
const ToolDropdown = ({ trigger, content }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className='focus:outline-none'>{trigger}</PopoverTrigger>
      <PopoverContent className='bg-white max-h-[350px] overflow-y-auto scrollbar  focus:outline-none'>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ToolDropdown;
