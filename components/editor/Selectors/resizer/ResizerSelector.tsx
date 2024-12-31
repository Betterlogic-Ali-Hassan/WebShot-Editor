"use client";
import { Resize } from "@/components/svgs";
import React, { useState } from "react";
import ToolCard from "../../ToolCard";
import ToolDropdown from "@/components/ToolDropdown";
import Resizer from "./Resizer";
interface ImageData {
  src: string;
  width: number;
  height: number;
}

interface Props {
  imageData?: ImageData | null;
  onResize?: (width: number, height: number) => void;
}

const ResizerSelector = ({ imageData, onResize }: Props) => {
  const [id, setId] = useState("num6");
  const handleId = () => {
    setId("num42");
    setTimeout(() => {
      setId("num6");
    }, 1000);
  };
  return (
    <ToolDropdown
      trigger={<ToolCard text='Resize' icon={<Resize />} id={9} />}
      content={
        <Resizer
          handleId={handleId}
          imageData={imageData}
          onResize={onResize}
        />
      }
      id={id}
    />
  );
};

export default ResizerSelector;
