"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { percentage } from "@/constant/Percentage";

export default function ZoomSelect({
  zoomLevel,
  setZoomLevel,
}: {
  zoomLevel: number;
  setZoomLevel: (value: number) => void;
}) {
  return (
    <Select
      value={zoomLevel.toString()}
      onValueChange={(value) => setZoomLevel(Number(value))}
    >
      <SelectTrigger className='w-[100px]'>
        <SelectValue>{zoomLevel}%</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {percentage.map((zoom) => (
          <SelectItem key={zoom} value={zoom.toString()}>
            {zoom}%
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
