import { Stickers } from "@/components/svgs";
import React, { useState } from "react";
import ToolCard from "../../ToolCard";
import Sticker from "./Sticker";
import ToolDropdown from "@/components/ToolDropdown";

const StickersSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <Stickers />
  );
  const [open, setOpen] = useState(false);
  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
    setOpen(false);
  };
  return (
    <ToolDropdown
      open={open}
      setOpen={setOpen}
      trigger={<ToolCard text='Stickers' icon={selectedIcon} id={11} />}
      content={<Sticker onClick={handleSelection} />}
    />
  );
};

export default StickersSelector;
