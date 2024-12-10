import {
  Capture,
  Clock,
  Desktop,
  EditPage,
  Select,
  Video,
} from "@/components/svgs";

export const options = [
  // {
  //   icon: <Video />,
  //   name: "Record Step-by-Step Guide",
  // },

  { icon: <Select />, name: "Select & Scroll", key: "Alt + S" },
  { icon: <Clock />, name: "Delayed screen", key: "Ctrl + D" },
  { icon: <Capture />, name: "Capture Fragment", key: "Alt + Shift + 3" },
  { icon: <EditPage />, name: "Edit Webpage", key: "Ctrl + E" },
  { icon: <Desktop />, name: "Desktop screenshot", key: "Ctrl + Shift + D" },
  { icon: <Video />, name: "Record Video", key: "Ctrl + R" },
];
