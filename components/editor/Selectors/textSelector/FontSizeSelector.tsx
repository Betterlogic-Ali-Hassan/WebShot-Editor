import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontSizes } from "@/constant/fontSize";

export default function FontSizeSelector() {
  return (
    <div className='space-y-2'>
      <Select>
        <SelectTrigger className=' lg:w-auto min-w-20 w-full '>
          <SelectValue placeholder={10} />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {fontSizes.map((item) => (
            <SelectItem value={`s${item}`} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
