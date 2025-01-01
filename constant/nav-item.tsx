import {
  ActionMenu,
  AdvSetting,
  CaptureTool,
  Recording,
  SaveTool,
  ShortKey,
} from "@/components/svgs";

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {
    icon: <CaptureTool />,
    label: "Capture Tools",
    href: "/option-final/capture",
  },
  { icon: <Recording />, label: "Recording", href: "/option-final/recording" },
  { icon: <SaveTool />, label: "Save Preferences", href: "/option-final/save" },
  { icon: <ActionMenu />, label: "Action Menu", href: "/option-final/action" },
  { icon: <ShortKey />, label: "ShortKey", href: "/option-final/short-key" },
  {
    icon: <AdvSetting />,
    label: "Advance Settings",
    href: "/option-final/adv",
  },
];
