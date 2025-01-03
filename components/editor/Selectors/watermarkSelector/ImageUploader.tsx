import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const ImageUploader: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className='space-y-4'>
      {!uploadedImage ? (
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
      ) : (
        <div className='relative h-[150px] w-full flex items-center justify-center'>
          <Image
            src={uploadedImage}
            alt='Uploaded'
            className='w-[150px] h-[150px] object-cover rounded'
            height={150}
            width={150}
          />
          <button
            onClick={handleRemoveImage}
            className='absolute top-2 right-14 p-1 bg-white rounded-full shadow-lg hover:bg-secondary'
          >
            <X className='w-4 h-4 text-red-500' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
