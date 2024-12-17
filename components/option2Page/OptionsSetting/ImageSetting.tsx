"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Radio } from "@/components/optionsPage/Radio";
import { cn } from "@/lib/utils";

interface ImageSettings {
  format: "jpg" | "png";
  quality: number;
}

const setting = [
  {
    title: "Format",
    options: [
      { value: "jpg", label: "JPG" },
      { value: "png", label: "PNG" },
    ],
    defaultValue: "png", // Default value set to PNG
  },
];

export default function ImageSetting() {
  const [settings, setSettings] = React.useState<ImageSettings>({
    format: "png", // Default format is PNG
    quality: 100,
  });

  const handleFormatChange = (format: "jpg" | "png") => {
    setSettings({ ...settings, format });
  };

  return (
    <div className='pt-6'>
      <h4 className='text-base font-semibold uppercase border-b pb-3'>
        Image Settings
      </h4>
      <div className='pt-2'>
        <div>
          {setting.map((setting) => (
            <Radio
              key={setting.title}
              title={setting.title}
              options={setting.options}
              defaultValue={setting.defaultValue}
              onChange={(value) => handleFormatChange(value as "jpg" | "png")}
            />
          ))}
        </div>

        {/* Smooth CSS transition */}
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            settings.format === "jpg"
              ? "h-[40px] opacity-100 mt-3"
              : "max-h-0 opacity-0"
          )}
        >
          {settings.format === "jpg" && (
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label>Quality</Label>
                <span className='text-sm text-muted-foreground'>
                  {settings.quality}%
                </span>
              </div>
              <Slider
                value={[settings.quality]}
                onValueChange={([value]) =>
                  setSettings({ ...settings, quality: value })
                }
                max={100}
                step={1}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
