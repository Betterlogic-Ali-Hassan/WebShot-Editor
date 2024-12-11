import { EditPage } from "@/components/svgs";
import React from "react";

const Brush = () => {
  return (
    <>
      <ul className='flex flex-col gap-3 w-full'>
        <li className='flex items-center justify-between p-2 px-3  hover:bg-light cursor-pointer text-sm'>
          Brush
          <EditPage />
        </li>
        <li className='flex items-center justify-between p-2 px-3 hover:bg-light cursor-pointer text-sm'>
          Oil Brush
          <EditPage />
        </li>
        <li className='flex items-center justify-between gap-4 p-2 px-3 hover:bg-light cursor-pointer text-sm'>
          Natural Pencil
          <EditPage />
        </li>
      </ul>
    </>
  );
};

export default Brush;
