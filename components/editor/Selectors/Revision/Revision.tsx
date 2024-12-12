import { revisionData } from "@/constant/RevisionData";
import React from "react";

const Revision = () => {
  return (
    <>
      <ul className='flex  flex-col gap-0.5 w-full '>
        {revisionData.map((item, index) => (
          <li
            key={index}
            className='flex items-center gap-3  py-2 px-3  hover:bg-light cursor-pointer text-sm justify-between'
          >
            {item.name}
            {item.icon}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Revision;
