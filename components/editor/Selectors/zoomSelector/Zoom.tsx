"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "../../../svgs";
import ZoomSelect from "../../ZoomSelect";

export default function Zoom() {
  const [zoomLevel, setZoomLevel] = useState(100);
  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };

  const adjustZoom = (adjustment: number) => {
    const newZoom = Math.max(10, Math.min(800, zoomLevel + adjustment));
    setZoomLevel(newZoom);
  };

  return (
    <div className='space-y-1 min-w-[350px]  py-4 px-3 flex items-center gap-6'>
      <ZoomSelect zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      <div className='flex items-center gap-4 min-w-[200px]'>
        <div>
          <Button
            variant='outline'
            size='icon'
            className='size-8 hover:bg-secondary'
            aria-label='Decrease value'
            onClick={() => adjustZoom(-1)}
            disabled={zoomLevel === 10}
          >
            <ZoomOut />
          </Button>
        </div>
        <Slider
          className='flex-grow'
          value={[zoomLevel]}
          min={10}
          max={800}
          step={10}
          onValueChange={handleZoomChange}
        />
        <div>
          <Button
            variant='outline'
            size='icon'
            className='size-8 hover:bg-secondary'
            aria-label='Increase value'
            onClick={() => adjustZoom(1)}
            disabled={zoomLevel === 800}
          >
            <ZoomIn />
          </Button>
        </div>
      </div>
    </div>
  );
}
