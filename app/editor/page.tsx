"use client";
import Editor from "@/components/editor/Editor";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import RevisionCard from "@/components/RevisionCard";

import { PopoverProvider } from "@/context/PopOverContext";
import React, { useState } from "react";

interface ImageData {
  src: string;
  width: number;
  height: number;
}

const Page = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);

  const handleResize = (newWidth: number, newHeight: number) => {
    if (originalImage) {
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9); // Maintain quality
        setImageData({
          src: resizedDataUrl,
          width: newWidth,
          height: newHeight,
        });
      };
      img.src = originalImage.src; // Always use original image for resizing
    }
  };

  const handleImageUpload = (uploadedImage: ImageData | null) => {
    if (uploadedImage) {
      setImageData(uploadedImage);
      setOriginalImage(uploadedImage); // Store original image
    } else {
      setImageData(null);
      setOriginalImage(null);
    }
  };

  return (
    <>
      <PopoverProvider>
        <Editor imageData={imageData} onResize={handleResize} />
      </PopoverProvider>
      <ImageUploader imageData={imageData} onImageUpload={handleImageUpload} />
      <RevisionCard />
    </>
  );
};

export default Page;
