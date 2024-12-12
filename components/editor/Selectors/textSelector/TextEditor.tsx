import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdOutlineStrikethroughS,
} from "react-icons/md";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TextEditor() {
  return (
    <ToggleGroup variant='outline' type='multiple'>
      <ToggleGroupItem
        value='bold'
        aria-label='Toggle bold'
        className='data-[state=on]:bg-secondary hover:bg-secondary [&_svg]:size-5 '
      >
        <MdFormatBold />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='italic'
        aria-label='Toggle italic'
        className='data-[state=on]:bg-secondary hover:bg-secondary [&_svg]:size-5'
      >
        <MdFormatItalic />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='underline'
        aria-label='Toggle underline'
        className='data-[state=on]:bg-secondary hover:bg-secondary [&_svg]:size-5'
      >
        <MdFormatUnderlined />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='Strikethrough'
        aria-label='Toggle Strikethrough'
        className='data-[state=on]:bg-secondary hover:bg-secondary [&_svg]:size-5'
      >
        <MdOutlineStrikethroughS />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
