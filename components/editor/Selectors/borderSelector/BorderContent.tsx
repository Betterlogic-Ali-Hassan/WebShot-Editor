"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import Padding from "./Padding";
import Browser from "./Browser";
import ColorPicker from "./ColorPicker2";

export default function BrowserContent() {
  const [browser, setBrowser] = useState(false);
  const [padding, setPadding] = useState(false);

  // Reference for padding content
  const paddingRef = useRef<HTMLDivElement | null>(null);

  const handlePaddingToggle = () => {
    setPadding(!padding);
    if (!padding) {
      // Scroll to the padding content when switch is turned on
      setTimeout(() => {
        paddingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Adding a slight delay for smooth rendering
    }
  };

  return (
    <div className='w-60 px-4 py-2 space-y-4'>
      <div className='flex items-center justify-between'>
        <Label htmlFor='browser' className='font-medium'>
          Browser
        </Label>

        <Switch
          id='browser'
          checked={browser}
          onClick={() => {
            setBrowser(!browser);
          }}
        />
      </div>
      {browser && <Browser />}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='padding' className='font-medium'>
            Padding
          </Label>
          <Switch
            id='padding'
            checked={padding}
            onClick={handlePaddingToggle}
          />
        </div>
        {padding && (
          <div ref={paddingRef}>
            <Padding />
            <ColorPicker />
          </div>
        )}
      </div>
    </div>
  );
}
