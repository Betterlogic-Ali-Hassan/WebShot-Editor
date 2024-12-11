"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}
const ToolDropdown = ({ trigger, content, open, setOpen }: Props) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className='bg-white max-h-[350px] overflow-y-auto scrollbar  focus:outline-none'>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ToolDropdown;
