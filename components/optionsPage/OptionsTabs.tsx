"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const OptionsTabs = () => {
  const path = usePathname();
  return (
    <div className='grid grid-cols-3 w-full mb-6'>
      <div
        className={cn(
          "border-b  text-center border-[#00000026] text-[#999]",
          path === "/options/capture" && "border-black text-black"
        )}
      >
        <Link
          href='/options/capture'
          className='h-[48px] flex items-center justify-center text-sm font-semibold  cursor-pointer'
        >
          Capture Preferences
        </Link>
      </div>
      <div
        className={cn(
          "border-b  text-center border-[#00000026] text-[#999]",
          path === "/options/record" && "border-black text-black"
        )}
      >
        <Link
          href='/options/record'
          className='h-[48px] flex items-center justify-center text-sm font-semibold  cursor-pointer'
        >
          Record Preferences
        </Link>
      </div>
      <div
        className={cn(
          "border-b  text-center border-[#00000026] text-[#999]",
          path === "/options/saving" && "border-black text-black"
        )}
      >
        <Link
          href='/options/saving'
          className='h-[48px] flex items-center justify-center text-sm font-semibold  cursor-pointer'
        >
          Saving Preferences
        </Link>
      </div>
    </div>
  );
};

export default OptionsTabs;
