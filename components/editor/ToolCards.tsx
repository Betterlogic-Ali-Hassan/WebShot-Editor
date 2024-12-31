"use client";

import React, { JSX, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CardSkelton from "./CardSkelton";
import { BlurIcon, Crop } from "@/components/svgs";
import { selectors } from "@/constant/CardSelector";
import { useToolCards } from "@/hooks/useToolCards";

import "swiper/css";
import "swiper/css/navigation";
import SliderBtn from "./SliderBtn";
import Cursor from "./Cursor";

interface ImageData {
  src: string;
  width: number;
  height: number;
}

interface ToolCardsProps {
  imageData: ImageData | null;
  onResize: (width: number, height: number) => void;
}

const cursorIcons: Record<number, JSX.Element> = {
  4: <Crop />,
  11: <BlurIcon />,
};

export default function ToolCards({ imageData, onResize }: ToolCardsProps) {
  const { loading, selectedCard, handleSelect } = useToolCards();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <div className='flex items-center justify-center gap-5 py-4 bg-bg border-b border-border shadow-sm px-5'>
        {loading ? (
          <div className='px-4 flex items-center gap-5 max-xl:w-[93%]'>
            {selectors.map((item) => (
              <CardSkelton key={item.id} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            slidesPerView='auto'
            spaceBetween={16}
            navigation={{ nextEl: "#next", prevEl: "#prev" }}
            className='mySwiper relative max-[1400px]:w-[93%] px-4'
          >
            <SliderBtn
              icon={<ChevronRight size={20} className='text-dark !fill-none' />}
              id='next'
              className='right-0'
            />
            <div className='flex items-center'>
              {selectors.map(
                ({ component: SelectorComponent, id, selection }) => (
                  <SwiperSlide key={id} className='max-w-max'>
                    <div
                      className={cn(
                        "cursor-pointer rounded-[16px] border-2 border-light hover:bg-secondary",
                        selectedCard === id &&
                          selection &&
                          "border-2 border-dotted border-card-border bg-secondary"
                      )}
                      onClick={() => handleSelect(id, selection)}
                    >
                      {id === 3 ? (
                        <SelectorComponent
                          imageData={imageData}
                          onResize={onResize}
                        />
                      ) : (
                        <SelectorComponent />
                      )}
                    </div>
                  </SwiperSlide>
                )
              )}
            </div>
            <SliderBtn
              icon={<ChevronLeft size={20} className='text-dark !fill-none' />}
              id='prev'
              className='left-0'
            />
          </Swiper>
        )}
      </div>
      {selectedCard && cursorIcons[selectedCard] && (
        <Cursor
          positionX={16}
          positionY={-13}
          ref={containerRef}
          selectedIcon={cursorIcons[selectedCard]}
          className='[&_svg]:h-[22px] [&_svg]:w-[22px]'
        />
      )}
    </div>
  );
}
