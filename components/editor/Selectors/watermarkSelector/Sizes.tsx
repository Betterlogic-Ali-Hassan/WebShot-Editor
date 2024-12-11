import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";

const Sizes = () => {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label>Size</Label>
          <span className='text-sm text-muted-foreground'>100%</span>
        </div>
        <Slider defaultValue={[100]} max={100} step={1} />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label>Opacity</Label>
          <span className='text-sm text-muted-foreground'>100%</span>
        </div>
        <Slider defaultValue={[100]} max={100} step={1} />
      </div>
    </div>
  );
};

export default Sizes;
