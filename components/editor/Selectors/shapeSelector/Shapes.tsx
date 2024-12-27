import { cn } from "@/lib/utils";
import ColorPicker from "../borderSelector/ColorPicker2";
import LinePicker from "../BorderPicker";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { shapesData } from "@/constant/shapeData";
interface Props {
  onClick: (icon: React.ReactNode, text: string) => void;
  selectedIcon: React.ReactNode;
}
const Shapes = ({ onClick, selectedIcon }: Props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);
  const handleClick = (icon: React.ReactNode, name: string) => {
    onClick(icon, name);
  };
  return (
    <>
      <ul className='flex items-center max-sm:flex-col gap-2 px-4 w-full'>
        {shapesData.map((item, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-2 rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-transparent max-sm:w-full",
              selectedIcon === item.icon &&
                " border-card-border  border-dotted bg-secondary"
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
        <li className='flex items-center gap-1.5 ml-2 max-sm:mb-1'>
          <Checkbox id='const' />
          <label htmlFor='const'>Constrained</label>
        </li>
        ;
      </ul>
      {!isMouseDown && selectedIcon && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x - 130, // Offset by 10px to be near the cursor
            top: cursorPosition.y - 105,
            pointerEvents: "none",
            zIndex: 9999,
            transition: "opacity 0.1s ease-in-out",
            opacity: isMouseDown ? 0 : 1,
          }}
        >
          {selectedIcon}
        </div>
      )}
    </>
  );
};

export default Shapes;
