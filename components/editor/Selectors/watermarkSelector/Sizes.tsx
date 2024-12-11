import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const Sizes = () => {
  const [sizeValue, setSizeValue] = useState(50);
  const [opacityValue, setOpacityValue] = useState(50);

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label>Size</Label>
          <span className='text-sm text-muted-foreground'>{sizeValue}%</span>
        </div>
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          value={[sizeValue]}
          onValueChange={(value) => setSizeValue(value[0])}
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label>Opacity</Label>
          <span className='text-sm text-muted-foreground'>{opacityValue}%</span>
        </div>
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          value={[opacityValue]}
          onValueChange={(value) => setOpacityValue(value[0])}
        />
      </div>
    </div>
  );
};

export default Sizes;
