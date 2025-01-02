"use client";
import HotKeys from "@/components/option2Page/OptionsSetting/HotKeys";
import MainMenu from "@/components/option2Page/OptionsSetting/MainMenu";
import { Sidebar } from "@/components/option2Page/Sidebar";
import OptionPageCard from "@/components/optionsPage/OptionPageCard";
import React from "react";

const page = () => {
  return (
    <div className='flex '>
      <Sidebar />
      <div className='w-full flex items-center justify-center'>
        <OptionPageCard>
          <MainMenu />
          <HotKeys />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
