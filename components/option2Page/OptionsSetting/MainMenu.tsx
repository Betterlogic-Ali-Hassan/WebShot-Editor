import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { options } from "@/constant/option";

import React from "react";

const MainMenu = () => {
  return (
    <>
      <div className='grid grid-cols-2 pt-3'>
        {options.map((item, i) => (
          <div key={i} className='flex items-center gap-2 py-3'>
            <Checkbox
              className='rounded-full h-5 w-5'
              defaultChecked
              value={item.name}
              id={item.name}
            />
            <Label htmlFor={item.name} className='flex items-center gap-2'>
              <span>{item.icon}</span>
              <h4>{item.name}</h4>
            </Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainMenu;
