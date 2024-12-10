import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const Resizer = () => {
  return (
    <div className='flex flex-col gap-2 p-4'>
      <div className='flex flex-col gap-2'>
        <h4>Width</h4>
        <Input />
      </div>
      <div className='flex flex-col gap-2'>
        <h4>Height</h4>
        <Input />
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox />
        <label>Proportional</label>
      </div>
      <Button className='bg-black text-white mt-4 hover:bg-black/40'>
        Change
      </Button>
    </div>
  );
};

export default Resizer;
