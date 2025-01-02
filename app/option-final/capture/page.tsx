"use client";
import { Sidebar } from "@/components/option2Page/Sidebar";
import Capture from "@/components/optionsPage/capture/Capture";
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
          title='Capture Tools'
          para=' Customize and manage screenshot options for your captures.'
        >
          <Capture />
        </OptionPageCard>
      </div>
    </div>
  );
};

export default page;
