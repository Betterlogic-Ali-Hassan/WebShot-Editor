"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
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
import WaterMarkSelector from "./Selectors/watermarkSelector/WaterMarkSelector";
import BorderSelector from "./Selectors/borderSelector/BorderSelector";
import StickersSelector from "./Selectors/stickersSelector/StickersSelector";
import RevisionContent from "./Selectors/Revision/RevisionContent";
import ExportSelector from "./Selectors/exportSelector/ExportSelector";
import TextArrowSelector from "./Selectors/textArrow/TextArrowSelector";
import SliderBtn from "./SliderBtn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CardSkelton from "./CardSkelton";
import { BlurIcon, Crop } from "../svgs";
import Cursor from "./Cursor";

const selectors = [
  { component: ImgSelector, id: 1, selection: false },
  { component: ZoomSelector, id: 2, selection: false },
  { component: ResizerSelector, id: 3, selection: false },
  { component: CropSelector, id: 4, selection: true },
  { component: PenSelector, id: 5, selection: true },
  { component: ShapeSelector, id: 6, selection: true },
  { component: ArrowSelector, id: 7, selection: true },
  { component: TextArrowSelector, id: 16, selection: true },
  { component: TextSelector, id: 8, selection: true },
  { component: NumberSelector, id: 9, selection: true },
  { component: StickersSelector, id: 10, selection: true },
  { component: BlurSelector, id: 11, selection: true },
  { component: BorderSelector, id: 12, selection: false },
  { component: WaterMarkSelector, id: 13, selection: false },
  { component: RevisionContent, id: 14, selection: false },
  { component: ExportSelector, id: 15, selection: false },
];

const ToolCards = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const cursorIcons: Record<number, JSX.Element> = {
    4: <Crop />,
    11: <BlurIcon />,
  };

  const handleSelect = (id: number, selection: boolean) => {
    if (selection) {
      setSelectedCard((prev) => (prev === id ? id : id));
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    const header = document.querySelector(".header") as HTMLElement;
    const tool = document.querySelector(".tool") as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const headerRect = header?.getBoundingClientRect();
      const toolRect = tool?.getBoundingClientRect();

      // Check if mouse is near the header or tool and set cursor to default
      if (
        headerRect &&
        e.clientY <= headerRect.bottom + 15 &&
        e.clientX >= headerRect.left - 28 &&
        e.clientX <= headerRect.right
      ) {
        document.body.style.cursor = "default"; // Set default cursor
      } else if (
        toolRect &&
        e.clientX >= toolRect.left - 28 &&
        e.clientX <= toolRect.right &&
        e.clientY >= toolRect.top - 20 &&
        e.clientY <= toolRect.bottom + 15
      ) {
        document.body.style.cursor = "default"; // Set default cursor when near tool
      } else {
        // Otherwise, change cursor based on selected card
        if (selectedCard === 4 || selectedCard === 11) {
          document.body.style.cursor = "url(/ResizerCursor.svg), auto"; // Custom cursor for Resizer
        } else if (selectedCard === 8) {
          document.body.style.cursor = "url(/Cursor.svg), auto"; // Custom cursor for Cursor
        } else {
          document.body.style.cursor = "default"; // Fallback to default cursor
        }
      }
    };

    // Add mouse move event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [selectedCard]);

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef}>
      <div className='flex items-center justify-center gap-5 py-4 bg-bg border-b border-border shadow-sm px-5 '>
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
            <div className='flex items-center '>
              {selectors.map(
                ({ component: SelectorComponent, id, selection }) => (
                  <SwiperSlide key={id} className='max-w-max'>
                    <div
                      className={cn(
                        "cursor-pointer rounded-[16px] border-2 border-light hover:bg-secondary",
                        selectedCard === id &&
                          selection &&
                          "border-2 border-dotted border-card-border bg-secondary "
                      )}
                      onClick={() => handleSelect(id, selection)}
                    >
                      <SelectorComponent />
                    </div>
                  </SwiperSlide>
                )
              )}
            </div>
            <SliderBtn
              icon={<ChevronLeft size={20} className='text-dark !fill-none' />}
              id='prev'
              className='left-0 '
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
          className='[&_svg]:h-[22px] [&_svg]:w-[22px] '
        />
      )}
    </div>
  );
};

export default ToolCards;
