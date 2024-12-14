import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className='img pt-[200px]  overflow-auto'>
      <Image
        src='/dummy.jpg'
        alt='img'
        height={2000}
        width={2000}
        className='object-cover w-screen'
      />
    </div>
  );
};

export default DummyImage;
