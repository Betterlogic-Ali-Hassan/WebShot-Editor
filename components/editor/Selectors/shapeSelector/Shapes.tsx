import React from "react";
import { Circle, RoundedSquare, RoundedStar, Square } from "../../../svgs";

const Shapes = () => {
  return (
    <ul className='flex flex-col gap-3 w-full'>
      <li className='flex items-center justify-between p-2 px-3 hover:bg-light cursor-pointer text-sm'>
        Square
        <Square />
      </li>
      <li className='flex items-center justify-between p-2 px-3 hover:bg-light cursor-pointer text-sm'>
        Rounded
        <RoundedSquare />
      </li>
      <li className='flex items-center justify-between gap-4 p-2 px-3 hover:bg-light cursor-pointer text-sm'>
        Circle
        <Circle />
      </li>
      <li className='flex items-center justify-between gap-4 p-2 px-3 hover:bg-light cursor-pointer text-sm'>
        Star
        <RoundedStar />
      </li>
    </ul>
  );
};

export default Shapes;
