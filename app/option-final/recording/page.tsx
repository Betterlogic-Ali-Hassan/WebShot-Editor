"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import Record from "@/components/optionsPage/Record/Record";
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
          title='Recording Settings'
          para='Set preferences for screen recording and video capture.'
        >
          <Record />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
