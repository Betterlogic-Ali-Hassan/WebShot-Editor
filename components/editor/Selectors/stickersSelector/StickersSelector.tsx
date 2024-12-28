import { Stickers } from "@/components/svgs";
import React, { useState } from "react";
import ToolCard from "../../ToolCard";
import Sticker from "./Sticker";
import ToolDropdown from "@/components/ToolDropdown";

const StickersSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(null); // No selection initially

  const handleSelection = (icon: React.ReactNode) => {
    setSelectedIcon(icon); // Update icon when a selection is made
  };

  return (
    <ToolDropdown
      trigger={
        <ToolCard
          text='Stickers'
          icon={selectedIcon || <Stickers />} // Use default icon if none is selected
          id={11}
        />
      }
      content={
        <Sticker onClick={handleSelection} selectedIcon={selectedIcon} />
      }
      id='num10'
    />
  );
};

export default StickersSelector;
