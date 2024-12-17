import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  options: Option[];
  defaultValue: string;
  onChange?: (value: string) => void; // Optional onChange prop
}

export function Radio({ title, options, defaultValue, onChange }: Props) {
  return (
    <div className='py-3 flex items-center justify-between'>
      <Label className='text-[15px] font-medium'>{title}</Label>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={(value) => onChange?.(value)} // Trigger onChange if provided
        className='flex flex-wrap gap-4 pt-2'
      >
        {options.map((option) => (
          <div key={option.value} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={option.value}
              id={`${title}-${option.value}`}
            />
            <Label htmlFor={`${title}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
