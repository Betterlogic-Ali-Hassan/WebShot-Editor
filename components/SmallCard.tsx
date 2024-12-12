import Tooltip from "./Tooltip";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "./ProgressBar";

interface Props {
  icon: React.ReactNode;
  text: string;
  content: string;
}

const SmallCard = ({ icon, text, content }: Props) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      toast({
        title: "Image Uploading",
        description: <ProgressBar />,
        duration: 5000,
      });
    }
  };

  return (
    <Tooltip content={content}>
      <div
        onClick={() => document.getElementById("imageUploader")?.click()}
        className='h-[90px] transition duration-300 w-[100px] rounded-xl flex items-center justify-center flex-col font-medium cursor-pointer text-[11px] gap-2 bg-secondary hover:bg-light active:border-dotted active:border-2 active:border-border'
      >
        {icon}
        <h4>{text}</h4>

        {/* Hidden File Input */}
        <input
          type='file'
          id='imageUploader'
          style={{ display: "none" }}
          accept='image/*'
          onChange={handleImageUpload}
        />
      </div>
    </Tooltip>
  );
};

export default SmallCard;
