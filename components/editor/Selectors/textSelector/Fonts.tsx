import React from "react";
import { fonts } from "@/constant/Fonts";
import FontCounter from "../../fontCounter";

const Fonts = () => {
  return (
    <div>
      <div className='flex flex-col  gap-2 text-sm font-medium pb-4 pt-2 px-3 '>
        Font Size:
        <FontCounter />
      </div>
      <ul className='flex flex-col gap-2 border-t pt-2'>
        {fonts.map((font, i) => (
          <li
            key={i}
            className='font-medium p-1.5 px-3 text-sm cursor-pointer hover:bg-light '
          >
            {font}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fonts;
