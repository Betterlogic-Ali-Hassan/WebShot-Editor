import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#FF9900");
  return (
    <div className='space-y-2 pt-2'>
      <Label htmlFor='color' className='font-medium'>
        Color
      </Label>
      <div className='relative  '>
        <Input
          type='text'
          id='color'
          value={color.toUpperCase()}
          onChange={(e) => setColor(e.target.value)}
          className='pl-10 group'
        />
        <div className='absolute inset-y-0 left-0 flex items-center p-1 px-2 '>
          <div
            className='w-6 h-6 rounded-sm border border-light  '
            style={{ backgroundColor: color }}
          />
        </div>
        <Input
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className='absolute inset-0 opacity-0 cursor-pointer  '
        />
      </div>
    </div>
  );
};

export default ColorPicker;
