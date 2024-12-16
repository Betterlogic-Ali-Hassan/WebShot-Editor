"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button, Group, Input } from "react-aria-components";
import { cn } from "@/lib/utils";

export default function InputWithBtn({
  val,
  unit,
  className,
  InputWidth,
}: {
  val: number;
  unit: string;
  className?: string;
  InputWidth?: string;
}) {
  const [value, setValue] = useState<number>(val);
  const handleIncrement = () => setValue((prev) => prev + 1);
  const handleDecrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div>
      <Group
        className={cn(
          "relative inline-flex h-[42px] items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow g data-[disabled]:opacity-50 data-[focus-within]:outline-none w-[110px] justify-between",
          className
        )}
      >
        <Input
          className={cn(
            " bg-background px-3 py-2  text-foreground focus:outline-none max-w-[70px] ",
            InputWidth
          )}
          value={cn(value, unit)}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <div className='flex h-[calc(100%+2px)] flex-col'>
          <Button
            onPress={handleIncrement}
            className='-me-px flex h-1/2 w-6  items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-light hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none ring-0'
          >
            <ChevronUp size={12} strokeWidth={2} />
          </Button>
          <Button
            onPress={handleDecrement}
            className='-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:bg-light focus:outline-none ring-0'
          >
            <ChevronDown size={12} strokeWidth={2} aria-hidden='true' />
          </Button>
        </div>
      </Group>
    </div>
  );
}
