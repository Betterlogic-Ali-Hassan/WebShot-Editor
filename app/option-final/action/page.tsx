"use client";
import MainMenu2 from "@/components/option2Page/OptionsSetting/MainMenu2";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
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
          title='Action Menu Settings'
          para='Enable or disable tools such as screen capture, video recording,
              and more.'
        >
          <MainMenu2 />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
