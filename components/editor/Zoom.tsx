"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "../svgs";

export default function Zoom() {
  const minValue = 0;
  const maxValue = 200;
  const steps = 5;
  const [value, setValue] = useState([100]);

  const decreaseValue = () =>
    setValue((prev) => [Math.max(minValue, prev[0] - steps)]);
  const increaseValue = () =>
    setValue((prev) => [Math.min(maxValue, prev[0] + steps)]);

  return (
    <div className='space-y-3 min-w-[250px] max-w-[300px] '>
      <Label className='tabular-nums'>{value[0]}%</Label>
      <div className='flex items-center gap-4'>
        <div>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            aria-label='Decrease value'
            onClick={decreaseValue}
            disabled={value[0] === 0}
          >
            <ZoomOut />
          </Button>
        </div>
        <Slider
          className='flex-grow'
          value={value}
          onValueChange={setValue}
          min={minValue}
          max={maxValue}
          step={steps}
          aria-label='Dual range slider with buttons'
        />
        <div>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            aria-label='Increase value'
            onClick={increaseValue}
            disabled={value[0] === 200}
          >
            <ZoomIn />
          </Button>
        </div>
      </div>
    </div>
  );
}
