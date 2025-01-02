"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import Saving2 from "@/components/optionsPage/Saving/Saving2";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div>
        <OptionPageCard
          custom
          tabs
          logo
          title='Saving Preferences'
          para='Choose where and how your captures are saved.'
        >
          <Saving2 />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
