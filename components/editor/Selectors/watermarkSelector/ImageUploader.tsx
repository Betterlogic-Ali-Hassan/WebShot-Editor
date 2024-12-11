import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React from "react";

const ImageUploader = () => {
  return (
    <div className='space-y-2'>
      <Button variant='outline' className='w-full h-24 border-dashed'>
        <div className='flex flex-col items-center gap-2'>
          <Upload className='w-5 h-5' />
          <span>Upload Image</span>
        </div>
      </Button>
    </div>
  );
};

export default ImageUploader;
