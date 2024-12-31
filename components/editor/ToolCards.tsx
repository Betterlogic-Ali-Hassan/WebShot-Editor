"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import SliderBtn from "./SliderBtn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CardSkelton from "./CardSkelton";
import { BlurIcon, Crop } from "../svgs";
import Cursor from "./Cursor";
import { selectors } from "@/constant/CardSelector";
interface ImageData {
  src: string;
  width: number;
  height: number;
}

interface Props {
  imageData: ImageData | null;
  onResize: (width: number, height: number) => void;
}

const ToolCards = ({ imageData, onResize }: Props) => {
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
        e.clientY <= headerRect.bottom &&
        e.clientX >= headerRect.left - 28 &&
        e.clientX <= headerRect.right
      ) {
        document.body.style.cursor = "default"; // Set default cursor
      } else if (
        toolRect &&
        e.clientX >= toolRect.left - 28 &&
        e.clientX <= toolRect.right &&
        e.clientY >= toolRect.top + 100 &&
        e.clientY <= toolRect.bottom + 15
      ) {
        document.body.style.cursor = "default"; // Set default cursor when near tool
      } else {
        // Otherwise, change cursor based on selected card
        if (selectedCard === 8) {
          document.body.style.cursor = "url(/Cursor.svg), auto"; // Custom cursor for Cursor
        } else if (
          selectedCard === 6 ||
          selectedCard === 7 ||
          selectedCard === 4 ||
          selectedCard === 11
        ) {
          document.body.style.cursor = "url(/ResizerCursor.svg), auto"; // Custom cursor for Resizer
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
