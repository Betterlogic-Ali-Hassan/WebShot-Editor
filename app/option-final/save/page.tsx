"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import Saving from "@/components/optionsPage/Saving/Saving";
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
          <Saving />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
