"use client";
import React, { useState } from "react";
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
import { cn } from "@/lib/utils";

const selectors = [
  { component: ImgSelector, id: 1 },
  { component: ZoomSelector, id: 2 },
  { component: ResizerSelector, id: 3 },
  { component: CropSelector, id: 4 },
  { component: PenSelector, id: 5 },
  { component: ShapeSelector, id: 6 },
  { component: ArrowSelector, id: 7 },
  { component: TextSelector, id: 8 },
  { component: NumberSelector, id: 9 },
  { component: StickersSelector, id: 10 },
  { component: BlurSelector, id: 11 },
  { component: BorderSelector, id: 12 },
  { component: WaterMarkSelector, id: 13 },
  { component: UndoSelector, id: 14 },
  { component: RedoSelector, id: 15 },
  { component: UndoAllSelector, id: 16 },
];

const ToolCards = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedCard((prev) => (prev === id ? id : id));
  };

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
        <div className='flex items-center'>
          {selectors.map(({ component: SelectorComponent, id }) => (
            <SwiperSlide key={id} className='max-w-max'>
              <div
                className={cn(
                  "cursor-pointer rounded-[16px] border-2 border-light",
                  selectedCard === id &&
                    "border-2 border-dotted border-border bg-secondary"
                )}
                onClick={() => handleSelect(id)}
              >
                <SelectorComponent />
              </div>
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
