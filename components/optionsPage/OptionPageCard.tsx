import React from "react";
import Link from "next/link";
import OptionsTabs from "./OptionsTabs";
import { Logo } from "../svgs";
import { cn } from "@/lib/utils";

const OptionPageCard = ({
  children,
  tabs,
  logo,
  title,
  para,
  custom,
}: {
  children?: React.ReactNode;
  tabs?: boolean;
  logo?: boolean;
  title?: string;
  para?: string;
  custom?: boolean;
}) => {
  return (
    <div className=' pt-[110px] px-[6rem] mb-2 '>
      <div className='mb-8'>
        <h1 className='font-bold text-[28px] '>{title}</h1>
        <p className='text-base text-[#777]'>{para}</p>
      </div>
      <div className=' flex flex-grow flex-col max-w-[640px] w-[640px] '>
        {!logo && (
          <div className='flex items-center w-full min-h-[60px]  justify-center'>
            <Link
              href='#'
              className='p-2 max-w-full text-base font-semibold relative flex items-center gap-1'
            >
              <Logo />
              WebShot
            </Link>
          </div>
        )}
        <div
          className={cn(
            "",
            !custom &&
              "border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727]"
          )}
        >
          {!tabs && <OptionsTabs />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default OptionPageCard;
