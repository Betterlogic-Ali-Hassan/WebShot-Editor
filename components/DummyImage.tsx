import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className='img pt-[200px]  overflow-auto'>
      <Image
        src='/dummy.png'
        alt='img'
        height={2000}
        width={2000}
        className='object-contain '
        priority
      />
    </div>
  );
};

export default DummyImage;
