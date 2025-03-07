import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface PaddingProps {
	size: number;
	onSizeChange: (size: number) => void;
}

const Padding = ({ size, onSizeChange }: PaddingProps) => {
	const minValue = 0;
	const maxValue = 200;
	const steps = 1;
	const [value, setValue] = useState([size]);

	useEffect(() => {
		setValue([size]);
	}, [size]);

	const decreaseValue = () => {
		const newValue = Math.max(minValue, value[0] - steps);
		setValue([newValue]);
		onSizeChange(newValue);
	};

	const increaseValue = () => {
		const newValue = Math.min(maxValue, value[0] + steps);
		setValue([newValue]);
		onSizeChange(newValue);
	};

	const handleSliderChange = (newValue: number[]) => {
		setValue(newValue);
		onSizeChange(newValue[0]);
	};

	return (
		<div className="space-y-3 pt-2">
			<Label className="tabular-nums flex items-center font-medium justify-between w-full pt-2.5 pb-1">
				Size <span>{value[0]}px</span>{' '}
			</Label>
			<div className="flex items-center gap-4">
				<div>
					<Button
						variant="outline"
						size="icon"
						className="size-8 disabled:opacity-50 dark:bg-select dark:hover:bg-light"
						aria-label="Decrease value"
						onClick={decreaseValue}
						disabled={value[0] === 0}
					>
						<Minus size={16} strokeWidth={2} aria-hidden="true" />
					</Button>
				</div>
				<Slider
					className="flex-grow"
					value={value}
					onValueChange={handleSliderChange}
					min={minValue}
					max={maxValue}
					step={steps}
					aria-label="Padding size slider"
				/>
				<div>
					<Button
						variant="outline"
						size="icon"
						className="size-8 disabled:opacity-50 dark:bg-select dark:hover:bg-light"
						aria-label="Increase value"
						onClick={increaseValue}
						disabled={value[0] === 200}
					>
						<Plus size={16} strokeWidth={2} aria-hidden="true" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Padding;
