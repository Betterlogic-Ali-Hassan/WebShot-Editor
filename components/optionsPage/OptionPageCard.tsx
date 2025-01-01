import React from "react";
import Link from "next/link";
import OptionsTabs from "./OptionsTabs";
import { Logo } from "../svgs";
import { cn } from "@/lib/utils";

const OptionPageCard = ({
  children,
  tabs,
  logo,
}: {
  children?: React.ReactNode;
  tabs?: boolean;
  logo?: boolean;
}) => {
  return (
    <div className='flex items-center justify-center mb-4'>
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
            "py-6 px-6 rounded-[24px] border-light bg-card optionCardShadow border-[0.5px]",
            logo && "mt-12"
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
