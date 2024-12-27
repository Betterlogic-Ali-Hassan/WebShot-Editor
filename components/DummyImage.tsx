import Image from "next/image";
import React from "react";

const DummyImage = ({ img }: { img: string }) => {
  return (
    <div className=' img  px-4 sm:px-[70px]'>
      <Image
        src={img}
        alt='img'
        height={2000}
        width={2000}
        className='object-cover rounded-[22px]   '
        priority
      />
    </div>
  );
};

export default DummyImage;
