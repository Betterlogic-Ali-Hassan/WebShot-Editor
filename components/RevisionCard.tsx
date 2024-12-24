import { revisionData } from "@/constant/RevisionData";
import React from "react";
import Tooltip from "./Tooltip";
import { Trash } from "lucide-react";

const RevisionCard = () => {
  return (
    <div className='bg-white flex items-center justify-center gap-2 px-2 focus:outline-none border-border fixed bottom-4 left-1/2 -translate-x-1/2 min-w-[180px]  border bg-popover py-2 shadow-md z-40 rounded-full'>
      {revisionData.map((item, id) => (
        <Tooltip
          trigger={item.icon}
          key={id}
          content={item.name}
          contentClass='bg-black text-white rounded-full'
        />
      ))}
      <Tooltip
        trigger={<Trash size={20} />}
        content='Delete'
        contentClass='bg-black text-white rounded-full'
      />
    </div>
  );
};

export default RevisionCard;
