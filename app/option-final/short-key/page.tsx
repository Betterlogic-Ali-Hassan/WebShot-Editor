"use client";
import HotKeys from "@/components/option2Page/OptionsSetting/HotKeys";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import React from "react";

const page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div>
        <OptionPageCard
          tabs
          logo
          title='Shortcut Keys'
          para='Set up and manage keyboard shortcuts for faster access.
'
        >
          <HotKeys />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
