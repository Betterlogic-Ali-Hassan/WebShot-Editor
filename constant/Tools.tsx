import {
  Arrow,
  Crop,
  Drop,
  File,
  Font,
  Number,
  Pen,
  Redo,
  Resize,
  Screen,
  Text,
  Undo,
  UndoAll,
  ZoomIn,
  ZoomOut,
} from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const tools = [
  {
    id: 1,
    name: "Image",
    icon: <File />,
    content: false,
  },
  {
    id: 2,
    name: "Zoom",
    icon: <ZoomIn />,
    content: false,
  },
  {
    id: 3,
    name: "Zoom",
    icon: <ZoomOut />,
    content: false,
  },
  {
    id: 4,
    name: "Resize",
    icon: <Resize />,
    content: (
      <div className='flex flex-col gap-2'>
        <div>
          <h4>Width</h4>
          <Input /> px
        </div>
        <div>
          <h4>Height</h4>
          <Input /> px
        </div>
        <div>
          <Checkbox />
          <label>Proportional</label>
        </div>
        <Button>Change</Button>
      </div>
    ),
  },
  {
    id: 5,
    name: "Crop",
    icon: <Crop />,
    content: false,
  },
  {
    id: 6,
    name: "Pen",
    icon: <Pen />,
    content: true,
  },
  {
    id: 7,
    name: "Square",
    icon: <Screen height={24} width={24} />,
    content: true,
  },
  {
    id: 8,
    name: "Arrows",
    icon: <Arrow />,
    content: true,
  },
  {
    id: 9,
    name: "Text",
    icon: <Text />,
    content: false,
  },
  {
    id: 10,
    name: "Font",
    icon: <Font />,
    content: false,
  },
  {
    id: 11,
    name: "Numbers",
    icon: <Number />,
    content: false,
  },
  {
    id: 12,
    name: "Blur",
    icon: <Drop />,
    content: true,
  },
  {
    id: 13,
    name: "Undo",
    icon: <Undo />,
  },
  {
    id: 14,
    name: "Redo",
    icon: <Redo />,
  },
  {
    id: 15,
    name: "UndoAll",
    icon: <UndoAll />,
  },
];
