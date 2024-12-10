import React from "react";
import { Input } from "../ui/input";
import { fonts } from "@/constant/Fonts";

const Fonts = () => {
  return (
    <div>
      <div className='flex flex-col  gap-2 text-sm font-medium pb-4 pt-2 '>
        Size:
        <Input placeholder='16px' className='max-w-[150px]' />
      </div>
      <ul className='flex flex-col gap-2 border-t pt-2'>
        {fonts.map((font, i) => (
          <li
            key={i}
            className='font-medium p-1.5 text-sm cursor-pointer hover:bg-light '
          >
            {font}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fonts;
