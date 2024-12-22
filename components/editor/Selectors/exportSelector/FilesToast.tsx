import ProgressBar from "@/components/ProgressBar";
import React, { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const FilesToast = ({ fileName }: { fileName: string }) => {
  const [progressComplete, setProgressComplete] = useState(false);
  const handleProgressComplete = () => {
    setProgressComplete(true);
  };
  return (
    <>
      <div className='relative w-full py-6 px-4'>
        <h2 className='font-semibold flex gap-2 text-[15px] items-center'>
          <IoIosCheckmarkCircle size={18} />
          {!progressComplete
            ? ` Preparing ${fileName} file... Please wait.`
            : "Done"}
        </h2>
      </div>
      <ProgressBar text onProgressComplete={handleProgressComplete} />
    </>
  );
};

export default FilesToast;
