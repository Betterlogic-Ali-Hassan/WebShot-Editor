import { exportData } from "@/constant/ExportData";
import React from "react";

const ExportContent = () => {
  return (
    <>
      <ul className='flex  flex-col gap-0.5 min-w-[180px]'>
        {exportData.map((item, index) => (
          <li
            key={index}
            className='flex items-center justify-between py-2 px-3  hover:bg-light cursor-pointer text-sm'
          >
            {item.name}
            {item.icon}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExportContent;
