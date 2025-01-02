"use client";
import MainMenu from "@/components/option2Page/OptionsSetting/MainMenu";
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
          <MainMenu />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
