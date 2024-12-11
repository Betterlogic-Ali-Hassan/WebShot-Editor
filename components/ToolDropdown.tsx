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
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className='bg-white max-h-[350px] overflow-y-auto scrollbar'>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ToolDropdown;
