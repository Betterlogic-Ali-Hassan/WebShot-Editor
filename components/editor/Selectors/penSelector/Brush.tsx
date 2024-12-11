import { brushData } from "@/constant/PencilData";
import React from "react";
interface Props {
  onClick: (icon: React.ReactNode) => void;
}
const Brush = ({ onClick }: Props) => {
  return (
    <>
      <ul className='flex flex-col gap-0.5 w-full'>
        {brushData.map((item, index) => (
          <li
            key={index}
            className='flex items-center justify-between py-2 px-3 hover:bg-light cursor-pointer text-sm'
            onClick={() => onClick(item.icon)}
          >
            {item.name}
            {item.icon}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Brush;
