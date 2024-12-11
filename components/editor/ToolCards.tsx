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
import SliderBtn from "./SliderBtn";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  UndoAllSelector,
  UndoAllSelector,
  UndoAllSelector,
];

const ToolCards = () => {
  return (
    <header className='flex items-center justify-center py-4 bg-white border-b border-border shadow-sm px-4'>
      <Swiper
        modules={[Navigation]}
        slidesPerView='auto'
        spaceBetween={16}
        navigation={{ nextEl: "#next", prevEl: "#prev" }}
        className='mySwiper relative'
      >
        <SliderBtn
          icon={<ChevronRight size={20} />}
          id='next'
          className='right-2'
        />
        <div className='flex items-center '>
          {selectors.map((SelectorComponent, index) => (
            <SwiperSlide key={index} className='max-w-max'>
              <SelectorComponent />
            </SwiperSlide>
          ))}
        </div>
        <SliderBtn
          icon={<ChevronLeft size={20} />}
          id='prev'
          className='left-2'
        />
      </Swiper>
    </header>
  );
};

export default ToolCards;
