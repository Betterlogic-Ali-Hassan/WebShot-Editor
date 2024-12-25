import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { arrowBox } from "@/constant/arrowBox";
interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon: React.ReactNode;
}
const TextArrow = ({ onClick, selectedIcon }: Props) => {
  const [defaultIcon, setDefaultIcon] = useState<React.ReactNode>(selectedIcon);

  const handleClick = (icon: React.ReactNode, name: string) => {
    onClick(icon, name);
    setDefaultIcon(icon);
  };

  return (
    <ul className='flex items-center max-sm:flex-col gap-2 px-4 w-full'>
      {arrowBox.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center gap-2 rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-transparent max-sm:w-full",
            (selectedIcon === item.icon || defaultIcon === item.icon) &&
              " border-card-border  border-dotted bg-secondary "
          )}
          onClick={() => handleClick(item.icon, item.name)}
        >
          {item.icon}
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default TextArrow;
