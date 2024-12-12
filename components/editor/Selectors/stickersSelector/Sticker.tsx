import { stickers } from "@/constant/stickers";
import React from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Sticker = ({ onClick }: Props) => {
  return (
    <div className='grid grid-cols-3 gap-x-1 gap-y-2 px-2'>
      {stickers.map((item, i) => (
        <div
          key={i}
          className=' py-2 px-3 hover:bg-light cursor-pointer '
          onClick={() => onClick(item.src)}
        >
          {item.src}
        </div>
      ))}
    </div>
  );
};

export default Sticker;
