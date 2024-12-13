import React from "react";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { TextEditor } from "./TextEditor";
import { TextAlign } from "./TextAlign";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import LinePicker from "../BorderPicker";
import ColorPicker from "../borderSelector/ColorPicker2";
const Fonts = () => {
  return (
    <div className='flex items-center gap-4 px-4 py-2'>
      <FontSelector />
      <FontSizeSelector />
      <Separator orientation='vertical' />
      <ColorPicker select />
      <LinePicker />
      <Separator orientation='vertical' />
      <TextEditor />
      <Separator orientation='vertical' />
      <TextAlign />
      <Separator orientation='vertical' />
      <div>
        <div className='flex items-center space-x-2 '>
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
