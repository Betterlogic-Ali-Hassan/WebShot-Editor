import React, { useRef } from "react";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { TextEditor } from "./TextEditor";
import { TextAlign } from "./TextAlign";

import ColorPicker from "../borderSelector/ColorPicker2";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/svgs";
import Cursor from "../../Cursor";
const Fonts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef}>
      <div className='flex items-center max-lg:flex-col gap-5 px-4 py-0.5 '>
        <div className='flex max-lg:flex-col gap-5'>
          <FontSelector />
          <FontSizeSelector />
        </div>
        <ColorPicker select />
        <TextEditor />
        <TextAlign />
        <div className='flex items-center gap-3'>
          <Separator orientation='vertical' className='max-sm:hidden' />
          <ColorPicker icon select />
        </div>
      </div>
      <Cursor
        selectedIcon={<Text />}
        ref={containerRef}
        positionX={26}
        positionY={13}
        className='[&_svg]:h-[20px] [&_svg]:w-[20px] '
      />
    </div>
  );
};

export default Fonts;
