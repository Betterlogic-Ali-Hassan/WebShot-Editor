import React from "react";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { TextEditor } from "./TextEditor";
import { TextAlign } from "./TextAlign";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ColorPicker from "../borderSelector/ColorPicker2";
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
      <div>
        <div className='flex items-center space-x-2 max-lg:mt-2 '>
          <Checkbox id='terms' className='h-4 w-4' />
          <Label htmlFor='terms' className='whitespace-nowrap cursor-pointer'>
            Background fill
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Fonts;
