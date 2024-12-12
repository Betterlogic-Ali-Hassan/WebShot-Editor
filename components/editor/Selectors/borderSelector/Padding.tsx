import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
const Padding = () => {
  const minValue = 0;
  const maxValue = 200;
  const steps = 1;
  const [value, setValue] = useState([100]);

  const decreaseValue = () =>
    setValue((prev) => [Math.max(minValue, prev[0] - steps)]);
  const increaseValue = () =>
    setValue((prev) => [Math.min(maxValue, prev[0] + steps)]);
  return (
    <div className='space-y-3 pt-2'>
      <Label className='tabular-nums flex items-center font-medium justify-between w-full pt-2.5 pb-1'>
        Size <span>{value[0]}px</span>{" "}
      </Label>
      <div className='flex items-center gap-4'>
        <div>
          <Button
            variant='outline'
            size='icon'
            className='size-8 disabled:opacity-50'
            aria-label='Decrease value'
            onClick={decreaseValue}
            disabled={value[0] === 0}
          >
            <Minus size={16} strokeWidth={2} aria-hidden='true' />
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
            className='size-8 disabled:opacity-50'
            aria-label='Increase value'
            onClick={increaseValue}
            disabled={value[0] === 200}
          >
            <Plus size={16} strokeWidth={2} aria-hidden='true' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Padding;
