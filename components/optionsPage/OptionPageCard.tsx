import React from "react";
import Link from "next/link";
import Image from "next/image";
import OptionsTabs from "./OptionsTabs";

const OptionPageCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-center mb-4'>
      <div className='min-h-screen flex flex-grow flex-col max-w-[640px] w-[640px] '>
        <div className='flex items-center w-full min-h-[60px]  justify-center'>
          <Link
            href='#'
            className='p-2 max-w-full text-base font-semibold relative flex items-center gap-1'
          >
            <Image src='/logo.svg' alt='logo' height={24} width={24} />
            WebShot
          </Link>
        </div>
        <div className='py-6 px-6 rounded-[24px] border-[#d5d5d5] optionCardShadow border-[0.5px]'>
          <OptionsTabs />
          {children}
        </div>
      </div>
    </div>
  );
};

export default OptionPageCard;
