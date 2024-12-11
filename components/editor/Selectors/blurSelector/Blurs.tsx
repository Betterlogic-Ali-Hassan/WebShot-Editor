import { blurData } from "@/constant/blurData";
import React from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Blurs = ({ onClick }: Props) => {
  return (
    <ul className='flex flex-col gap-3 w-full'>
      {blurData.map((item) => (
        <li
          key={item.id}
          className='flex items-center justify-between p-2 px-3 hover:bg-light cursor-pointer text-sm'
          onClick={() => onClick(item.icon)}
        >
          {item.name}
          {item.icon}
        </li>
      ))}
    </ul>
  );
};

export default Blurs;
