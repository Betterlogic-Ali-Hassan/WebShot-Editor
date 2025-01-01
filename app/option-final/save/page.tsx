"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import Saving from "@/components/optionsPage/Saving/Saving";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full flex items-center justify-center'>
        <OptionPageCard tabs logo>
          <div className='border-b pb-3'>
            <h1 className='font-semibold text-lg'>Saving Preferences</h1>
            <p className='text-sm text-[#777]'>
              Choose where and how your captures are saved.
            </p>
          </div>
          <Saving />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
