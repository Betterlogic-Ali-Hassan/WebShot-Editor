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

export const tools = [
  {
    id: "Insert",
    name: "Image",
    icon: <File />,
  },
  {
    id: "zoomIn",
    name: "Zoom",
    icon: <ZoomIn />,
  },
  {
    id: "zoomOut",
    name: "Zoom",
    icon: <ZoomOut />,
  },
  {
    id: "resize",
    name: "Resize",
    icon: <Resize />,
  },
  {
    id: "crop",
    name: "Crop",
    icon: <Crop />,
  },
  {
    id: "pen",
    name: "Pen",
    icon: <Pen />,
  },
  {
    id: "square",
    name: "Square",
    icon: <Screen height={24} width={24} />,
  },
  {
    id: "arrow",
    name: "Arrows",
    icon: <Arrow />,
  },
  {
    id: "text",
    name: "Text",
    icon: <Text />,
  },
  {
    id: "font",
    name: "Font",
    icon: <Font />,
  },
  {
    id: "number",
    name: "Numbers",
    icon: <Number />,
  },
  {
    id: "blur",
    name: "Blur",
    icon: <Drop />,
  },
  {
    id: "undo",
    name: "Undo",
    icon: <Undo />,
  },
  {
    id: "redo",
    name: "Redo",
    icon: <Redo />,
  },
  {
    id: "undoAll",
    name: "UndoAll",
    icon: <UndoAll />,
  },
];
