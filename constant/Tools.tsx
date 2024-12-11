import Arrows from "@/components/editor/Arrows";
import Blurs from "@/components/editor/Blurs";
import Brush from "@/components/editor/Brush";
import Fonts from "@/components/editor/Fonts";
import Resizer from "@/components/editor/Resizer";
import Shapes from "@/components/editor/Shapes";
import Zoom from "@/components/editor/Zoom";
import { LiaStampSolid } from "react-icons/lia";

import {
  Arrow,
  Border,
  Crop,
  Drop,
  File,
  // Horizontal,
  Number,
  Pen,
  Redo,
  Resize,
  Screen,
  Stickers,
  Text,
  Undo,
  UndoAll,
  ZoomIn,
} from "@/components/svgs";
export const tools = [
  {
    id: 1,
    name: "Image",
    icon: <File />,
    hasDropdown: false,
  },
  {
    id: 2,
    name: "Zoom",
    icon: <ZoomIn />,
    hasDropdown: true,
    content: <Zoom />,
  },
  {
    id: 4,
    name: "Resize",
    icon: <Resize />,
    hasDropdown: true,
    content: <Resizer />,
  },
  {
    id: 5,
    name: "Crop",
    icon: <Crop />,
    hasDropdown: false,
  },
  {
    id: 6,
    name: "Pen",
    icon: <Pen />,
    hasDropdown: true,
    content: <Brush />,
  },
  {
    id: 7,
    name: "Square",
    icon: <Screen height={24} width={24} />,
    hasDropdown: true,
    content: <Shapes />,
  },
  {
    id: 8,
    name: "Arrows",
    icon: <Arrow />,
    hasDropdown: true,
    content: <Arrows />,
  },
  // {
  //   id: 9,
  //   name: "Line",
  //   icon: <Horizontal />,
  //   hasDropdown: true,
  //   content: <Arrows />,
  // },
  {
    id: 10,
    name: "Text",
    icon: <Text />,
    hasDropdown: true,
    content: <Fonts />,
  },
  {
    id: 11,
    name: "Numbers",
    icon: <Number />,
    hasDropdown: false,
  },
  {
    id: 12,
    name: "Stickers",
    icon: <Stickers />,
    hasDropdown: false,
  },
  {
    id: 13,
    name: "Watermark",
    icon: <LiaStampSolid size={24} />,
    hasDropdown: false,
  },
  {
    id: 14,
    name: "Border",
    icon: <Border />,
    hasDropdown: false,
  },
  {
    id: 12,
    name: "Blur",
    icon: <Drop />,
    hasDropdown: true,
    content: <Blurs />,
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
