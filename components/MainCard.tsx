"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Tooltip from "./Tooltip";
import { About, Cinema, Picture, Rate, Setting, Sun } from "./svgs";
import Alert from "./Alert";
import SmallCard from "./SmallCard";
import Select from "./Select";
import Menu from "./Options";

const MainCard = () => {
  const [alert, setAlert] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>("Light Mode");

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
  };
  const handleClose = () => {
    setAlert(false);
  };
  return (
    <Card className='overflow-hidden w-[388px] relative high-shadow border-none max-h-[600px] overflow-y-auto scrollbar '>
      <CardHeader className='border-b py-3 px-4 flex flex-row items-center justify-between'>
        <div>
          <CardTitle className='text-[15px] font-medium flex items-center gap-3'>
            <Image src='/logo.png' alt='logo' height={20} width={20} />
            Download Video
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
          <SmallCard
            icon={<Sun />}
            text='Light Mode'
            content='Enable Light Mode'
            isSelected={selectedCard === "Light Mode"}
            onClick={() => handleCardClick("Light Mode")}
          />
          <SmallCard
            icon={<Cinema />}
            content='Disabled Cinema Mode'
            text='Cinema Mode'
            isSelected={selectedCard === "Cinema Mode"}
            onClick={() => handleCardClick("Cinema Mode")}
          />
          <SmallCard
            icon={<Picture />}
            content='Disabled Picture-n-Picture Mode'
            text='PiP'
            isSelected={selectedCard === "PiP"}
            onClick={() => handleCardClick("PiP")}
          />
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
