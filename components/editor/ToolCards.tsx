import React from "react";
import ArrowSelector from "./Selectors/arrowSelector/ArrowSelector";
import ImgSelector from "./Selectors/imageSelector/ImgSelector";
import ZoomSelector from "./Selectors/zoomSelector/ZoomSelector";
import ResizerSelector from "./Selectors/resizer/ResizerSelector";
import CropSelector from "./Selectors/cropSelector/CropSelector";
import PenSelector from "./Selectors/penSelector/PenSelector";
import ShapeSelector from "./Selectors/shapeSelector/ShapeSelector";
import TextSelector from "./Selectors/textSelector/TextSelector";
import NumberSelector from "./Selectors/numberSelector/NumberSelector";
import BlurSelector from "./Selectors/blurSelector/BlurSelector";
import UndoSelector from "./Selectors/undoSelector/UndoSelector";
import RedoSelector from "./Selectors/RedoSelector/RedoSelector";
import UndoAllSelector from "./Selectors/undoAllSelector/UndoAllSelector";
import WaterMarkSelector from "./Selectors/watermarkSelector/WaterMarkSelector";

const ToolCards = () => {
  return (
    <header className='flex items-center justify-center py-4 bg-white border-b border-border shadow-sm'>
      <div className='flex items-center gap-4'>
        <ImgSelector />
        <ZoomSelector />
        <ResizerSelector />
        <CropSelector />
        <PenSelector />
        <ShapeSelector />
        <ArrowSelector />
        <TextSelector />
        <NumberSelector />
        <BlurSelector />
        <WaterMarkSelector />
        <UndoSelector />
        <RedoSelector />
        <UndoAllSelector />
      </div>
    </header>
  );
};

export default ToolCards;
