import React from "react";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { TextEditor } from "./TextEditor";
import { TextAlign } from "./TextAlign";

import ColorPicker from "../borderSelector/ColorPicker2";
import { Separator } from "@/components/ui/separator";
const Fonts = () => {
  return (
    <div className='flex items-center max-lg:flex-col gap-5 px-4 py-0.5 '>
      <div className='flex max-lg:flex-col gap-5'>
        <FontSelector />
        <FontSizeSelector />
      </div>
      <ColorPicker select />
      <TextEditor />
      <TextAlign />
      <div className='flex items-center gap-3'>
        <Separator orientation='vertical' />
        <ColorPicker icon select />
      </div>
    </div>
  );
};

export default Fonts;
