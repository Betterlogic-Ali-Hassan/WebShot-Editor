import {
  Corner,
  Crop,
  Draw,
  Extension,
  Frame,
  Merge,
  Resize,
  Setting,
  Stickers,
  Text,
} from "@/components/svgs";

export const tools = [
  {
    id: "filter",
    name: "Filter",
    icon: <Setting />,
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
    id: "draw",
    name: "Draw",
    icon: <Draw />,
  },
  {
    id: "text",
    name: "Text",
    icon: <Text />,
  },
  {
    id: "shapes",
    name: "Shapes",
    icon: <Extension />,
  },
  {
    id: "stickers",
    name: "Stickers",
    icon: <Stickers />,
  },
  {
    id: "frame",
    name: "Frame",
    icon: <Frame />,
  },
  {
    id: "corners",
    name: "Corners",
    icon: <Corner />,
  },
  {
    id: "merge",
    name: "Merge",
    icon: <Merge />,
  },
];
