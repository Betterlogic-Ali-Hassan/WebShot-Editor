import React from "react";
import {
  Arrow,
  CruveArrow,
  DoubleArrow,
  Line,
  LineCruve,
  LineDotted,
} from "../svgs";

const Arrows = () => {
  return (
    <ul className='flex flex-col gap-3 w-full'>
      <li className='flex items-center justify-between p-2 hover:bg-light cursor-pointer text-sm'>
        Arrow Line
        <Arrow height={20} width={20} />
      </li>
      <li className='flex items-center justify-between p-2 hover:bg-light cursor-pointer text-sm'>
        Arrow Curve
        <CruveArrow height={20} width={20} />
      </li>
      <li className='flex items-center justify-between gap-4 p-2 hover:bg-light cursor-pointer text-sm'>
        Double Arrow
        <DoubleArrow height={18} width={18} />
      </li>
      <li className='flex items-center justify-between gap-4 p-2 hover:bg-light cursor-pointer text-sm'>
        Line
        <Line height={20} width={20} />
      </li>
      <li className='flex items-center justify-between gap-4 p-2 hover:bg-light cursor-pointer text-sm'>
        Curve Line
        <LineCruve height={20} width={20} />
      </li>
      <li className='flex items-center justify-between gap-4 p-2 hover:bg-light cursor-pointer text-sm'>
        Dotted Line
        <LineDotted height={20} width={20} />
      </li>
    </ul>
  );
};

export default Arrows;
