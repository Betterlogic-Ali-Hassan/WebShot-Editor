import React, { useRef } from "react";

interface ToolCardProps {
  icon: React.ReactNode;
  text: string;
  id: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, text }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (text.toLowerCase() === "image" && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div
      className='flex items-center justify-center flex-col gap-4  cursor-pointer transition duration-300 h-[68px] w-[68px] rounded-[16px]'
      onClick={handleClick}
    >
      <span className='h-[25%]'>{icon}</span>
      <h4 className=' text-xs max-w-[59px] truncate h-[25%] '>{text}</h4>
      {text.toLowerCase() === "image" && (
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='image/*'
          className='hidden'
        />
      )}
    </div>
  );
};

export default ToolCard;
