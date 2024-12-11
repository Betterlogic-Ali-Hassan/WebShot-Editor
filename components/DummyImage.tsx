import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center pt-12 '>
      <Image
        src='/dummy.jpg'
        alt='img'
        height={500}
        width={500}
        className='object-cover'
      />
    </div>
  );
};

export default DummyImage;
