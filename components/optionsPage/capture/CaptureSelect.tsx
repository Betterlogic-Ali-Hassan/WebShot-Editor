import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
interface Props {
  title: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}
const CaptureSelect = ({ title, options, defaultValue }: Props) => {
  return (
    <div className='flex items-center justify-between border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727] mb-8'>
      <h4>{title}</h4>
      <Select>
        <SelectTrigger
          defaultValue={defaultValue}
          className='w-auto h-10 flex gap-4'
        >
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent className='max-h-[300px]'>
          {options.map((option, i) => (
            <SelectItem key={i} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CaptureSelect;
