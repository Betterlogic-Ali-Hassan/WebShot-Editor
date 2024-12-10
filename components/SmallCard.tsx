import { cn } from "@/lib/utils";
// import Tooltip from "./Tooltip";
interface Props {
  icon: React.ReactNode;
  text: string;
  // content?: string;
  isSelected?: boolean;
  onClick: () => void;
}
const SmallCard = ({ icon, text, isSelected, onClick }: Props) => {
  return (
    <div
      className={cn(
        "h-[90px] transition duration-300 w-[100px] rounded-xl flex items-center justify-center flex-col font-medium cursor-pointer  text-[11px] gap-2 bg-secondary hover:bg-light",
        isSelected && "bg-light border-dotted border-2 border-border"
      )}
      onClick={onClick}
    >
      {icon}
      <h4>{text}</h4>
    </div>
  );
};

export default SmallCard;
