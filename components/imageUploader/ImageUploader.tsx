"use client";
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface ImageData {
  src: string;
  width: number;
  height: number;
}

interface ImageUploaderProps {
  imageData: ImageData | null;
  onImageUpload: (imageData: ImageData | null) => void;
}
const ImageUploader = ({ imageData, onImageUpload }: ImageUploaderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handlePaste = useCallback(
    (event: React.ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const src = e.target?.result as string;
                const img = new Image();
                img.onload = () => {
                  onImageUpload({ src, width: img.width, height: img.height });
                };
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  img.src = src;
                }, 1000);
              };
              reader.readAsDataURL(blob);
            }
          }
        }
      }
    },
    [onImageUpload]
  );
  const handleImageError = useCallback(() => {
    onImageUpload(null);
  }, [onImageUpload]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          const img = new Image();
          img.onload = () => {
            onImageUpload({ src, width: img.width, height: img.height });
          };
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            img.src = src;
          }, 2000);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "" || urlRegex.test(value)) {
      setError("");
    } else {
      setError("Invalid URL");
    }
  }, []);

  const handleBtn = () => {
    setBtnLoading(true); // Start button loading

    setTimeout(() => {
      setBtnLoading(false); // Stop button loading
      setLoading(true); // Start image loading
    }, 2000);

    setTimeout(() => {
      setLoading(false); // Stop image loading after 2 seconds
    }, 2000); // 2 seconds timeout
  };

  return (
    <>
      {imageData ? (
        <div className=' img  px-4 sm:px-[70px] flex items-center justify-center'>
          <img
            src={imageData.src}
            alt='img'
            className=' rounded-[22px]'
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className='min-h-screen   flex items-center'>
          <div className='pt-[80px] max-w-[900px] mx-auto w-full px-4'>
            <div
              className=' p-4 rounded-[16px] border-dashed flex items-center  border-2 justify-center flex-col min-h-[420px] w-full '
              onPaste={handlePaste}
            >
              {loading ? (
                <Loader2 size={40} className='animate-spin' />
              ) : (
                <>
                  <h1 className='mb-6 font-semibold text-[30px]'>
                    Capture Screenshot from URL
                  </h1>
                  <div className='w-full border  rounded-full h-[54px] flex items-center  overflow-hidden max-w-[700px]'>
                    <Input
                      placeholder='Enter Website URL e.g., https://example.com'
                      className='bg-transparent shadow-none border-none px-4 '
                      value={inputValue}
                      onChange={handleChange}
                    />
                    <Button
                      className='bg-dark hover:bg-black/90 text-white dark:text-black h-full rounded-l-none font-medium '
                      onClick={handleBtn}
                    >
                      {btnLoading && (
                        <Loader2 size={20} className='animate-spin' />
                      )}
                      Capture Screenshot
                    </Button>
                  </div>

                  <span
                    className={cn(
                      "text-red-500 mt-1   text-sm opacity-0",
                      error && "opacity-100"
                    )}
                  >
                    {error ? error : "hy"}
                  </span>
                  <div className='my-10 mt-8 flex items-center'>
                    <Separator className='mr-4 w-[200px] bg-border' />
                    <span>OR</span>
                    <Separator className='ml-4 w-[200px] bg-border' />
                  </div>
                  <Button
                    className=' px-10 h-12 rounded-full font-semibold hover:bg-black hover:text-white  '
                    variant='outline'
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
                  >
                    Upload Image
                  </Button>
                  <Input
                    type='file'
                    id='imageUpload'
                    className='hidden'
                    accept='image/*'
                    onChange={handleFileUpload}
                  />
                  <p className='text-[13px] mt-2 text-[#888] '>
                    Or press Ctrl + V to paste an image directly.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
