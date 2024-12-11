import React from "react";
import { Drop } from "../svgs";

const Blurs = () => {
  return (
    <ul className='flex flex-col gap-3 w-full'>
      <li className='flex items-center justify-between p-2 px-3  hover:bg-light cursor-pointer text-sm'>
        Blur Area
        <Drop height={20} width={20} />
      </li>
      <li className='flex items-center justify-between p-2 px-3  hover:bg-light cursor-pointer text-sm'>
        Blur Area
        <Drop height={20} width={20} />
      </li>
    </ul>
  );
};

export default Blurs;
