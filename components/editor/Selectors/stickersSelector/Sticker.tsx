import { stickers } from "@/constant/stickers";
import React from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Sticker = ({ onClick }: Props) => {
  return (
    <div className='flex items-center gap-2 px-4'>
      {stickers.map((item, i) => (
        <div
          key={i}
          className='hover:bg-light cursor-pointer p-2 rounded-md inline-flex items-center justify-center border-2 border-dotted  '
          onClick={() => onClick(item.src)}
        >
          {item.src}
        </div>
      ))}
    </div>
  );
};

export default Sticker;
