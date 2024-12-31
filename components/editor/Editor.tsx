import React from "react";
import ToolCards from "./ToolCards";
interface ImageData {
  src: string;
  width: number;
  height: number;
}

interface Props {
  imageData: ImageData | null;
  onResize: (width: number, height: number) => void;
}

const Editor = ({ imageData, onResize }: Props) => {
  return (
    <header className='fixed header w-full top-0 z-50'>
      <ToolCards imageData={imageData} onResize={onResize} />
    </header>
  );
};

export default Editor;
