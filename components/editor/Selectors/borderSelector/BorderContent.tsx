"use client";

import { useBrowserContent } from "@/hooks/useBrowserContent";
import { ToggleSwitch } from "./ToggleSwitch";
import Browser from "./Browser";
import Padding from "./Padding";
import ColorPicker from "./ColorPicker2";

export function BrowserContent() {
  const { browser, padding, paddingRef, toggleBrowser, togglePadding } =
    useBrowserContent();

  return (
    <div className='w-60 px-4 py-2 space-y-4'>
      <ToggleSwitch
        id='browser'
        label='Browser'
        checked={browser}
        onToggle={toggleBrowser}
      />
      {browser && <Browser />}
      <div className='space-y-2'>
        <ToggleSwitch
          id='padding'
          label='Padding'
          checked={padding}
          onToggle={togglePadding}
        />
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
