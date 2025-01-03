"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
interface Props {
  title: string;
}
const QualitySelect = ({ title }: Props) => {
  const qualityOptions = [
    { value: "4320p", label: "4320p", badge: "8K" },
    { value: "2160p", label: "2160p", badge: "4K" },
    { value: "1440p", label: "1440p", badge: "2K" },
    { value: "1080p", label: "1080p", badge: "HD" },
    { value: "720p", label: "720p", badge: "HD" },
    { value: "380p", label: "380p", badge: "SD" },
    { value: "244p", label: "244p", badge: "SD" },
    { value: "144p", label: "144p", badge: "SD" },
  ];
  const [selectedQuality, setSelectedQuality] = useState<string>(
    qualityOptions[1].value
  );
  return (
    <>
      <div className='font-medium flex items-center justify-between mt-4 '>
        <div className='pt-2'>
          <h4 className='text-sm'>{title}</h4>
        </div>
        <div className=' ml-4'>
          <Select value={selectedQuality} onValueChange={setSelectedQuality}>
            <SelectTrigger className='w-full h-[44px]'>
              <SelectValue placeholder='Select video quality' />
            </SelectTrigger>
            <SelectContent className='max-h-[190px]'>
              {qualityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className='grid grid-cols-2 w-full'>
                    <span>{option.label}</span>
                    <Badge className='rounded text-[10.4px] h-[18px] w-[20px] bg-dark text-card ml-4 mr-2 py-0 font-semibold flex items-center justify-center'>
                      {option.badge}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default QualitySelect;
