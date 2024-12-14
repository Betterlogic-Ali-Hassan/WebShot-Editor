import { useRouter } from "next/navigation";
import Tooltip from "./Tooltip";

interface Props {
  icon: React.ReactNode;
  text: string;
  content: string;
  setScreenShot: (screenShot: boolean) => void;
}

const SmallCard = ({ icon, text, content, setScreenShot }: Props) => {
  const router = useRouter();
  const handleScreenshot = () => {
    if (text === "Entire Page") {
      setScreenShot(true);
      setTimeout(() => {
        router.push("/editor");
      }, 5000);
    }
  };
  return (
    <>
      <Tooltip content={content}>
        <div
          className='h-[90px] transition duration-300 w-[100px] rounded-xl flex items-center justify-center flex-col font-medium cursor-pointer text-[11px] gap-2 bg-secondary hover:bg-light active:border-dotted active:border-2 active:border-border relative'
          onClick={handleScreenshot}
        >
          {icon}
          <h4>{text}</h4>
        </div>
      </Tooltip>
    </>
  );
};

export default SmallCard;
