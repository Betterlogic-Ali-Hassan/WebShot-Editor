"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button, Group, Input, Label } from "react-aria-components";

export default function InputWithBtn({ text }: { text: string }) {
  const [value, setValue] = useState<number>(16);

  const handleIncrement = () => setValue((prev) => prev + 1);
  const handleDecrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className='space-y-2 flex flex-col'>
      <Label className='text-sm font-medium text-foreground'>{text}</Label>
      <Group className='relative inline-flex h-[42px] items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20'>
        <Input
          className='flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none'
          value={`${value}px`}
          aria-label={`${text} value`}
        />
        <div className='flex h-[calc(100%+2px)] flex-col'>
          <Button
            onPress={handleIncrement}
            className='-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-light hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          >
            <ChevronUp size={12} strokeWidth={2} aria-hidden='true' />
          </Button>
          <Button
            onPress={handleDecrement}
            className='-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:bg-light'
          >
            <ChevronDown size={12} strokeWidth={2} aria-hidden='true' />
          </Button>
        </div>
      </Group>
    </div>
  );
}
