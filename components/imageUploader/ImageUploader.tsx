"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import DummyImage from "../DummyImage";
import { Loader2 } from "lucide-react";

const ImageUploader = () => {
  const [image, setImage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData.items;
    const imageItem = Array.from(items).find((item) =>
      item.type.startsWith("image/")
    );

    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        setLoading(true); // Start loading
        const reader = new FileReader();
        reader.onload = () => {
          setTimeout(() => {
            setImage(reader.result as string);
            setLoading(false);
          }, 1000);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      {image ? (
        <DummyImage img={image} />
      ) : (
        <div className='pt-[130px] max-w-[900px] mx-auto w-full px-4'>
          <div
            className=' p-4 rounded-[16px] border-dashed flex items-center  border-2 justify-center flex-col min-h-[420px] w-full '
            onPaste={handlePaste}
          >
            {loading ? (
              <Loader2 size={40} className='animate-spin' />
            ) : (
              <>
                <h2 className='mb-6 font-semibold'>
                  Capture Screenshot from URL
                </h2>
                <div className='w-full border shadow-md rounded-full h-[54px] flex items-center  overflow-hidden max-w-[700px]'>
                  <Input
                    placeholder='Enter Website URL e.g., https://example.com'
                    className='bg-transparent shadow-none border-none px-4 '
                  />
                  <Button className='bg-dark hover:bg-black/90 text-white dark:text-black h-full rounded-l-none font-medium '>
                    Capture Screenshot
                  </Button>
                </div>
                <div className='my-10 flex items-center'>
                  <Separator className='mr-4 w-[200px] bg-border' />
                  <span>OR</span>
                  <Separator className='ml-4 w-[200px] bg-border' />
                </div>
                <Button
                  className=' px-10 h-12 rounded-full font-semibold hover:bg-black hover:text-white  '
                  variant='outline'
                >
                  Upload Image
                </Button>
                <p className='text-[13px] mt-2 text-[#888] '>
                  Or press Ctrl + V to paste an image directly.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
