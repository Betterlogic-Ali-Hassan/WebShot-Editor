import { exportData } from "@/constant/ExportData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React from "react";

const ExportContent = () => {
  const { toast } = useToast();
  return (
    <>
      <ul className='flex  flex-col gap-0.5 min-w-[180px]'>
        {exportData.map((item, index) => (
          <li
            onClick={() => toast({ description: item.toast })}
            key={index}
            className={cn(
              "flex items-center gap-3 py-2 px-3  hover:bg-light cursor-pointer text-sm",
              item.border && "border-b border-t py-[10px] mt-1"
            )}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExportContent;
