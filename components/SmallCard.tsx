import { useState } from "react";
import Tooltip from "./Tooltip";
import UploadingBox from "./UploadingBox";

interface Props {
  icon: React.ReactNode;
  text: string;
  content: string;
}

const SmallCard = ({ icon, text, content }: Props) => {
  const [uploaded, setUploaded] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploaded(true);

      setTimeout(() => {
        setUploaded(false);
      }, 5000);
    }
  };

  const handleClick = () => {
    if (text === "Entire Page") {
      document.getElementById("imageUploader")?.click();
    }
  };

  return (
    <Tooltip content={content}>
      <div
        onClick={handleClick}
        className='h-[90px] transition duration-300 w-[100px] rounded-xl flex items-center justify-center flex-col font-medium cursor-pointer text-[11px] gap-2 bg-secondary hover:bg-light active:border-dotted active:border-2 active:border-border relative'
      >
        {icon}
        <h4>{text}</h4>
        {/* Hidden File Input */}
        {text === "Entire Page" && (
          <input
            type='file'
            id='imageUploader'
            style={{ display: "none" }}
            accept='image/*'
            onChange={handleImageUpload}
          />
        )}
        {uploaded && (
          <div className='bg-white absolute top-full mt-2 rounded-md border border-border px-4 py-2.5 min-w-[320px] shadow-md'>
            <UploadingBox />
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default SmallCard;
