import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className='min-h-screen pt-[190px]  overflow-auto'>
      <Image
        src='/dummy.png'
        alt='img'
        height={2000}
        width={2000}
        className='object-cover '
        priority
      />
    </div>
  );
};

export default DummyImage;
