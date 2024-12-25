import { stickers } from "@/constant/stickers";
import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
  selectedIcon?: React.ReactNode;
}
const Sticker = ({ onClick, selectedIcon }: Props) => {
  return (
    <div className='grid grid-cols-6 gap-2 px-4 max-h-[180px] overflow-y-auto scrollbar'>
      {stickers.map((item, i) => (
        <div
          key={i}
          className={cn(
            "hover:bg-light cursor-pointer p-2 rounded-md inline-flex items-center justify-center border-2 border-transparent  max-sm:w-full",
            selectedIcon === item.src &&
              "border-dotted border-2 border-card-border bg-secondary"
          )}
          onClick={() => onClick(item.src)}
        >
          {item.src}
        </div>
      ))}
    </div>
  );
};

export default Sticker;
