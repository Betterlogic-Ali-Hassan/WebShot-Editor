import Image from "next/image";
import React from "react";

const DummyImage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center pt-12 '>
      <Image src='/dummy.jpg' alt='img' height={1000} width={1000} />
    </div>
  );
};

export default DummyImage;
