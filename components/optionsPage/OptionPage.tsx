import Link from "next/link";
import React from "react";
import OptionPageCard from "./OptionPageCard";
import Image from "next/image";

const OptionPage = () => {
  return (
    <div className='min-h-screen flex flex-grow flex-col max-w-[640px] w-[640px] mb-6'>
      <div className='flex items-center w-full min-h-[60px]  justify-center'>
        <Link
          href='#'
          className='p-2 max-w-full text-base font-semibold relative flex items-center gap-1'
        >
          <Image src='/logo.svg' alt='logo' height={24} width={24} />
          WebShot
        </Link>
      </div>
      <OptionPageCard />
    </div>
  );
};

export default OptionPage;
