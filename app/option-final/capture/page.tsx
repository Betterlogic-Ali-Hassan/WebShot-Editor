"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import Capture from "@/components/optionsPage/capture/Capture";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full flex items-center justify-center'>
        <OptionPageCard tabs logo>
          <h1 className='font-semibold text-lg'>Capture Tools</h1>
          <p className='text-sm text-[#777]'>
            Customize and manage screenshot options for your captures.
          </p>
          <Capture />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
