import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  options: Option[];
  defaultValue: string;
  onChange?: (value: string) => void;
}

export function Radio({ title, options, defaultValue }: Props) {
  return (
    <div className='py-3 flex items-center justify-between'>
      <legend className='font-medium py-2'>{title}</legend>
      <RadioGroup className='flex flex-wrap gap-4' defaultValue={defaultValue}>
        {options.map((item, id) => (
          <div
            key={id}
            className='flex items-center gap-[10px] text-sm cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#535353] px-4 text-[15px] border w-fit h-[44px] rounded-lg dark:border-[#383838] border-[#dadada] relative'
          >
            <div className='flex items-center gap-2'>
              <RadioGroupItem
                id={item.label}
                value={item.value}
                className='after:absolute after:inset-0'
              />
              <Label htmlFor={item.label}>{item.label}</Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
    // <div >
    //   <Label className='font-medium py-2'>{title}</Label>
    //   <RadioGroup
    //     defaultValue={defaultValue}
    //     onValueChange={(value) => onChange?.(value)}
    //     className='flex items-center gap-x-6 gap-y-3 flex-wrap'
    //   >
    //     {options.map((option) => (
    //       <div
    //         key={option.value}
    //         className='flex items-center gap-[10px] text-sm cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#535353] px-4 text-[15px] border w-fit h-[44px] rounded-lg dark:border-[#383838] border-[#dadada]'
    //         onClick={() => onChange?.(option.value)}
    //       >
    //         <RadioGroupItem
    //           value={option.value}
    //           id={`${title}-${option.value}`}
    //           className='w-[18px] h-[18px]'
    //         />
    //         <Label htmlFor={`${title}-${option.value}`}>{option.label}</Label>
    //       </div>
    //     ))}
    //   </RadioGroup>
    // </div>
  );
}
