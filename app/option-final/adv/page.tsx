"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import MoreSetting from "@/components/optionsPage/moreSettings/MoreSetting";
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
          title='Advanced Options'
          para='Access additional settings and fine-tune advanced features.'
        >
          <MoreSetting />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
