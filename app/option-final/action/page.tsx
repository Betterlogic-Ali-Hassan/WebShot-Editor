"use client";
import MainMenu from "@/components/option2Page/OptionsSetting/MainMenu";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full flex items-center justify-center'>
        <OptionPageCard tabs logo>
          <div className='border-b pb-3'>
            <h1 className='font-semibold text-lg'>Action Menu Settings </h1>
            <p className='text-sm text-[#777]'>
              Enable or disable tools such as screen capture, video recording,
              and more.
            </p>
          </div>
          <MainMenu />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
