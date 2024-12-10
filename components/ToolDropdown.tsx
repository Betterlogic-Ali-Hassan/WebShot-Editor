import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
interface Props {
  trigger: React.ReactNode;
  dropdownContent?: React.ReactNode[];
}
const ToolDropdown = ({ trigger, dropdownContent }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white'>
        {dropdownContent?.map((item, index) => (
          <DropdownMenuItem key={index} className='dropdown-item'>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToolDropdown;
