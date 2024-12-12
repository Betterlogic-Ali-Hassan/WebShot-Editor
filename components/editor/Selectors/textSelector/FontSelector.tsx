import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fonts } from "@/constant/Fonts";

export default function FontSelector() {
  return (
    <div className='space-y-2'>
      <Select>
        <SelectTrigger className='w-auto min-w-48 max-w-full'>
          <SelectValue placeholder='Calibri' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {fonts.map((font, i) => (
            <SelectItem value={font} key={i}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
