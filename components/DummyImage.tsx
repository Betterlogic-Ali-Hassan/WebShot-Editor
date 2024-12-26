import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className=' img  px-4 sm:px-[70px]'>
      <Image
        src='/dummy.png'
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
