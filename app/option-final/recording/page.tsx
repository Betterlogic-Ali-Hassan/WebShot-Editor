"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import Record from "@/components/optionsPage/Record/Record";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full flex items-center justify-center'>
        <OptionPageCard tabs logo>
          <h1 className='font-semibold text-lg'>Recording Settings</h1>
          <p className='text-sm text-[#777]'>
            Set preferences for screen recording and video capture.
          </p>
          <Record />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
