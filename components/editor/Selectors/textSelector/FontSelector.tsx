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
        <SelectTrigger className='w-auto min-w-48 max-w-full border-border'>
          <SelectValue placeholder='Calibri' />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font, i) => (
            <SelectItem
              value={font.name}
              key={i}
              style={{ fontFamily: font.style }}
            >
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
