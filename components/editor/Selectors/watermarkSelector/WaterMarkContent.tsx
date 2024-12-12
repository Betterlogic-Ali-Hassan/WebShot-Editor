"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PositionSelection from "./PositionSelection";
import Sizes from "./Sizes";
import ImageUploader from "./ImageUploader";
import { useState } from "react";

export default function WatermarkContent() {
  const [open, setOpen] = useState(false);
  return (
    <div className='w-full min-w-[280px] px-4 '>
      <div className='py-4  space-y-6'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='watermark' className='text-base'>
            Watermark
          </Label>
          <Switch
            id='watermark'
            onClick={() => setOpen(!open)}
            checked={open}
          />
        </div>
        {open && (
          <>
            <ImageUploader />
            <PositionSelection />
            <Sizes />
          </>
        )}
      </div>
    </div>
  );
}
