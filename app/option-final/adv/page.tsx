"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import MoreSetting from "@/components/optionsPage/moreSettings/MoreSetting";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full flex items-center justify-center'>
        <OptionPageCard tabs logo>
          <div className='border-b pb-3'>
            <h1 className='font-semibold text-lg'>Advanced Options</h1>
            <p className='text-sm text-[#777]'>
              Access additional settings and fine-tune advanced features.
            </p>
          </div>
          <MoreSetting />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
