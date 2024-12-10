import {
  Area,
  Capture,
  Clock,
  Computer,
  Desktop,
  Select,
  Video,
  Visible,
} from "@/components/svgs";

export const options = [
  {
    icon: <Video />,
    name: "Record Step-by-Step Guide",
  },
  {
    icon: <Visible />,
    name: "Visible part of page",
  },
  {
    icon: <Capture />,
    name: "Capture Fragment",
  },
  {
    icon: <Area />,
    name: "Selected area",
  },
  {
    icon: <Select />,
    name: "Select & Scroll",
  },
  {
    icon: <Computer />,
    name: "Entire page",
  },
  {
    icon: <Clock />,
    name: "Delayed screen",
  },
  {
    icon: <Desktop />,
    name: "Desktop screenshot",
  },
  {
    icon: <Video />,
    name: "Record Video",
  },
];
