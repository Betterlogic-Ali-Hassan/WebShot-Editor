import React from "react";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { TextEditor } from "./TextEditor";
import { TextAlign } from "./TextAlign";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
const Fonts = () => {
  return (
    <div className='flex items-center gap-4 px-4 py-2'>
      <FontSelector />
      <FontSizeSelector />
      <Separator orientation='vertical' />
      <TextEditor />
      <Separator orientation='vertical' />
      <TextAlign />
      <Separator orientation='vertical' />
      <div>
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' className='h-5 w-5' />
          <Label htmlFor='terms'>Background fill</Label>
        </div>
      </div>
    </div>
  );
};

export default Fonts;
