"use client";

import React, { useState, useEffect } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full  mx-auto mt-3'>
      <div className='relative pt-1'>
        <div className='flex mb-2 items-center justify-between'>
          <div>
            <span className='text-sm font-semibold inline-block  '>
              Full Page Capturing...
            </span>
          </div>
          <div className='text-right'>
            <span className='text-sm font-semibold inline-block '>
              {progress}%
            </span>
          </div>
        </div>
        <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-secondary'>
          <div
            style={{ width: `${progress}%` }}
            className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black transition-all duration-500 ease-out'
          ></div>
        </div>
      </div>
    </div>
  );
}
