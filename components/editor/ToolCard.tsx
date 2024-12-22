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
      className='flex items-center justify-center flex-col hover:bg-secondary cursor-pointer transition duration-300 h-[68px] w-[68px] rounded-[16px]'
      onClick={handleClick}
    >
      <span>{icon}</span>
      <h4 className='mt-1.5 text-xs'>{text}</h4>
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
