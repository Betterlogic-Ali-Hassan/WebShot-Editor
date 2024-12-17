import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScreenSelect = ({
  trigger,
  items,
}: {
  trigger: string;
  items: string[];
}) => {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={trigger} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ScreenSelect;
