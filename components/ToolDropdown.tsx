"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  trigger: React.ReactNode;
  dropdownContent?: React.ReactNode[];
}
const ToolDropdown = ({ trigger, dropdownContent }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className='bg-white max-h-[350px] overflow-y-auto scrollbar'>
        {dropdownContent?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ToolDropdown;
