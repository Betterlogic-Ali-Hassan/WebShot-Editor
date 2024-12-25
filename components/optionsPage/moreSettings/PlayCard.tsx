import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import React from "react";

const PlayCard = ({
  className,
  name,
}: {
  className?: string;
  name: string;
}) => {
  return (
    <div className='bg-secondary border border-light rounded-[4px] float-left px-[10px] text-center mr-[30px] mb-[30px] min-w-[118px] max-w-[118px] min-h-[50px]  flex items-center justify-center '>
      <label className='flex items-center cursor-pointer'>
        <span>
          <Checkbox
            className='rounded-full h-[18px] w-[18px] mt-1.5'
            defaultChecked
            value={name}
            id={name}
          />
        </span>

        <div
          className={cn("support-item", className)}
          style={{ background: "url('/icon.png')" }}
        ></div>
      </label>
    </div>
  );
};

export default PlayCard;
