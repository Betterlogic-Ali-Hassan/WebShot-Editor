import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({
  id,
  label,
  checked,
  onToggle,
}: ToggleSwitchProps) {
  return (
    <div className='flex items-center justify-between'>
      <Label htmlFor={id} className='font-medium'>
        {label}
      </Label>
      <Switch id={id} checked={checked} onClick={onToggle} />
    </div>
  );
}
