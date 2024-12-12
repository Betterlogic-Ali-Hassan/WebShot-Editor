import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className='min-h-screen  pt-3 '>
      <Image
        src='/dummy.png'
        alt='img'
        height={2000}
        width={2000}
        className='object-cover w-screen'
      />
    </div>
  );
};

export default DummyImage;
