"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Tooltip from "../Tooltip";
import { About, Rate, Setting } from "../svgs";
import Alert from "../Alert";
import SmallCard from "../SmallCard";
import Select from "../Select";
import Menu from "./Options";
import { smallCard } from "@/constant/smallCardData";

const MainCard = () => {
  const [alert, setAlert] = useState(true);
  const handleClose = () => {
    setAlert(false);
  };
  return (
    <Card className='overflow-hidden w-[388px] relative high-shadow border-none max-h-[600px] overflow-y-auto scrollbar '>
      <CardHeader className='border-b py-3 px-4 flex flex-row items-center justify-between'>
        <div>
          <CardTitle className='text-[15px] font-medium flex items-center gap-2'>
            <Image src='/logo.svg' alt='logo' height={24} width={24} />
            Webshot{" "}
            <span className='py-1 px-2 bg-secondary rounded-md text-xs font-medium'>
              v1.0
            </span>
          </CardTitle>
        </div>
        <div className='flex items-center gap-2'>
          <Tooltip content='About Us' trigger={<About />} />
          <Tooltip content='Rate Us' trigger={<Rate />} />
          <Tooltip content='Settings' trigger={<Setting />} />
        </div>
      </CardHeader>
      <CardContent>
        {alert && <Alert handleClose={handleClose} />}
        <div className=' py-6 grid grid-cols-3 gap-3'>
          {smallCard.map((item, i) => (
            <SmallCard
              key={i}
              icon={item.icon}
              text={item.name}
              content={item.key}
            />
          ))}
        </div>
        <Menu />
        <div className='pt-6'>
          <Select />
        </div>
      </CardContent>
    </Card>
  );
};

export default MainCard;
