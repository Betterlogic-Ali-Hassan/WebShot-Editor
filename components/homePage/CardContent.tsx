"use client";

import { useState } from "react";
import Alert from "@/components/Alert";
import SmallCard from "@/components/SmallCard";
import Select from "@/components/Select";
import { smallCard } from "@/constant/smallCardData";
import Rating from "@/components/Rating/Rating";
import UploadingBox from "@/components/UploadingBox";
import { OptionsMenu } from "./OptionMenu";
interface CardProps {
  setRatingOpen: (ratingOpen: boolean) => void;
  ratingOpen: boolean;
}
export function CardContent({ ratingOpen, setRatingOpen }: CardProps) {
  const [alert, setAlert] = useState(true);
  const [screenshot, setScreenshot] = useState(false);

  if (ratingOpen) {
    return <Rating setRatingOpen={setRatingOpen} />;
  }

  if (screenshot) {
    return (
      <div className='py-6'>
        <UploadingBox />
      </div>
    );
  }

  return (
    <div className='p-6 pt-0'>
      {alert && <Alert handleClose={() => setAlert(false)} />}
      <div className='py-6 grid grid-cols-3 gap-3'>
        {smallCard.map((item, i) => (
          <SmallCard
            key={i}
            setScreenShot={setScreenshot}
            icon={item.icon}
            text={item.name}
            content={item.key}
          />
        ))}
      </div>
      <OptionsMenu />
      <div className='pt-6'>
        <Select />
      </div>
    </div>
  );
}
