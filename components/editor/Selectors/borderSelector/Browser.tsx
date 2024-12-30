"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BrowserSkeleton from "./Skelton";

const Browser = () => {
  const [selected, setSelected] = useState("first");
  const [loading, setLoading] = useState(false);
  const handleSelectedItem = (item: string) => {
    setSelected(item);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <BrowserSkeleton />
      ) : (
        <>
          <div className='space-y-2'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() => handleSelectedItem("first")}
            >
              <Image
                src='/win.png'
                alt='Windows browser'
                height={53}
                width={200}
                className={cn(
                  "rounded-md object-cover border-2 border-[#f1f1f1] max-h-[53px] ",
                  selected === "first" && "border-border border-2 border-dotted"
                )}
                priority
              />
            </div>

            <div
              className='flex items-center cursor-pointer'
              onClick={() => handleSelectedItem("second")}
            >
              <Image
                src='/mac.png'
                alt='Mac browser'
                height={53}
                width={200}
                className={cn(
                  "rounded-md object-cover border-2 border-[#f1f1f1] max-h-[53px]",
                  selected === "second" &&
                    "border-border border-2 border-dotted"
                )}
                priority
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Button
              className={cn(
                "text-sm text-black bg-light text-dark hover:bg-black hover:text-white border w-full border-border rounded ",
                selected === "urlTop" && "border-border border-2 border-dotted"
              )}
              size='sm'
              onClick={() => handleSelectedItem("urlTop")}
            >
              URL on top
            </Button>
            <Button
              className={cn(
                "text-sm text-black  hover:bg-black hover:text-white text-dark bg-light border border-border w-full rounded",
                selected === "urlBottom" &&
                  "border-border border-2 border-dotted"
              )}
              size='sm'
              onClick={() => handleSelectedItem("urlBottom")}
            >
              URL on bottom
            </Button>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center justify-between py-1'>
              <Label htmlFor='include-url' className='text-sm cursor-pointer'>
                Include URL
              </Label>
              <Checkbox id='include-url' defaultChecked />
            </div>
            <div className='flex items-center justify-between pb-1.5'>
              <Label htmlFor='include-date' className='text-sm cursor-pointer'>
                Include Date
              </Label>
              <Checkbox id='include-date' defaultChecked />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Browser;
