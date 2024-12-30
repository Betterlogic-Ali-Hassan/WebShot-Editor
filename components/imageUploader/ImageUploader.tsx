"use client";
import React, { useCallback, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import DummyImage from "../DummyImage";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ImageUploader = () => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setImage(imageUrl);
      }, 2000);
    }
  };
  // URL validation regex
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
  const handleBtn = () => {
    setBtnLoading(true); // Start button loading

    setTimeout(() => {
      setBtnLoading(false); // Stop button loading
      setLoading(true); // Start image loading
    }, 1000);

    setTimeout(() => {
      setLoading(false); // Stop image loading after 2 seconds
    }, 2000); // 2 seconds timeout
  };

  return (
    <>
      {image ? (
        <DummyImage img={image} />
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
                      className='bg-transparent shadow-none border-none px-4 tool'
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
                    onClick={handleClick}
                  >
                    Upload Image
                  </Button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='image/*'
                    className='hidden'
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
