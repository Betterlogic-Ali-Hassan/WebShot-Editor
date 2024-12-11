"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
import BorderSelector from "./Selectors/borderSelector/BorderSelector";
import StickersSelector from "./Selectors/stickersSelector/StickersSelector";

const selectors = [
  ImgSelector,
  ZoomSelector,
  ResizerSelector,
  CropSelector,
  PenSelector,
  ShapeSelector,
  ArrowSelector,
  TextSelector,
  NumberSelector,
  StickersSelector,
  BlurSelector,
  BorderSelector,
  WaterMarkSelector,
  UndoSelector,
  RedoSelector,
  UndoAllSelector,
];

const ToolCards = () => {
  return (
    <header className='flex items-center justify-center py-4 bg-white border-b border-border shadow-sm px-4'>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView='auto'
        spaceBetween={10}
        className='mySwiper'
      >
        <div className='flex items-center '>
          {selectors.map((SelectorComponent, index) => (
            <SwiperSlide key={index} className='max-w-max'>
              <SelectorComponent />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </header>
  );
};

export default ToolCards;
