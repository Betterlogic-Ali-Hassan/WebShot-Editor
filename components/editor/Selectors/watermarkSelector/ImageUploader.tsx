import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Upload } from "lucide-react";
import React from "react";

const ImageUploader = () => {
  const { fileInputRef, handleFileChange, handleThumbnailClick } =
    useImageUpload();
  return (
    <div className='space-y-2'>
      <Button
        variant='outline'
        className='w-full h-24 border-dashed'
        onClick={handleThumbnailClick}
      >
        <div className='flex flex-col items-center gap-2'>
          <Upload className='w-5 h-5' />
          <span>Upload Image</span>
        </div>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          accept='image/*'
          aria-label='Upload image file'
        />
      </Button>
    </div>
  );
};

export default ImageUploader;
