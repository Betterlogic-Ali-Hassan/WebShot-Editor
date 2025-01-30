'use client';

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { options } from '@/constant/Lines';
import { useEffect, useState } from 'react';

interface LinePickerProps {
	onChange?: (width: number) => void;
	initialWidth?: number;
}

export default function LinePicker({
	onChange,
	initialWidth = 2,
}: LinePickerProps) {
	const [currentWidth, setCurrentWidth] = useState<number>(initialWidth);

	useEffect(() => {
		setCurrentWidth(initialWidth);
	}, [initialWidth]);

	const handleValueChange = (value: string) => {
		const numValue = Number(value);
		setCurrentWidth(numValue);
		if (onChange) {
			onChange(numValue);
		}
	};

	return (
		<Select
			value={currentWidth.toString()}
			onValueChange={handleValueChange}
		>
			<SelectTrigger className="min-w-[80px] border-0">
				<div className="flex flex-col items-center">
					<SelectValue placeholder={`${currentWidth} px`} />
					<div
						className="bg-dark w-[60px]"
						style={{ height: `${currentWidth}px` }}
					/>
				</div>
			</SelectTrigger>
			<SelectContent className="py-2 !px-0">
				{options.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value.toString()}
						className="flex items-center gap-2"
					>
						<span className="mb-1">{option.label}</span>
						<div
							className="bg-dark w-[60px]"
							style={{ height: option.thickness }}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
