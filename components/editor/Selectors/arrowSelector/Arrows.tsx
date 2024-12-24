import { arrows } from "@/constant/arrows";
import { cn } from "@/lib/utils";
import ColorPicker from "../borderSelector/ColorPicker2";
import LinePicker from "../BorderPicker";
interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon: React.ReactNode;
  setSelectedIcon: (icon: React.ReactNode) => void;
}
const Arrows = ({ onClick, selectedIcon }: Props) => {
  const handleClick = (icon: React.ReactNode, name: string) => {
    onClick(icon, name);
  };
  return (
    <ul className='flex items-center max-sm:flex-col gap-2 px-4 w-full'>
      {arrows.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center gap-2 rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-white max-sm:w-full",
            selectedIcon === item.icon && " border-border  border-dotted"
          )}
          onClick={() => handleClick(item.icon, item.name)}
        >
          {item.icon}
          {item.name}
        </li>
      ))}
      <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
        <ColorPicker select />
      </li>
      <li className='flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer'>
        <LinePicker />
      </li>
    </ul>
  );
};

export default Arrows;
