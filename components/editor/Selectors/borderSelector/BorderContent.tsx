"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Padding from "./Padding";
import Browser from "./Browser";
import ColorPicker from "./ColorPicker";

export default function BrowserContent() {
  const [browser, setBrowser] = useState(false);
  const [padding, setPadding] = useState(false);
  return (
    <div className='w-60 p-4 space-y-4'>
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
            onClick={() => {
              setPadding(!padding);
            }}
          />
        </div>
        {padding && (
          <>
            <Padding />
            <ColorPicker />
          </>
        )}
      </div>
    </div>
  );
}
