import { FiAlignCenter, FiAlignLeft, FiAlignRight } from "react-icons/fi";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TextAlign() {
  return (
    <ToggleGroup type='single'>
      <ToggleGroupItem
        value='left'
        aria-label='Toggle left'
        variant='outline'
        className='data-[state=on]:bg-secondary hover:bg-secondary border-2 data-[state=on]:border-dotted  [&_svg]:size-5'
      >
        <FiAlignLeft size={24} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='center'
        aria-label='Toggle center'
        variant='outline'
        className='data-[state=on]:bg-secondary hover:bg-secondary border-2 data-[state=on]:border-dotted  [&_svg]:size-5'
      >
        <FiAlignCenter className='h-5 w-5' />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='right'
        aria-label='Toggle right'
        variant='outline'
        className='data-[state=on]:bg-secondary hover:bg-secondary border-2 data-[state=on]:border-dotted  [&_svg]:size-5 '
      >
        <FiAlignRight size={24} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
