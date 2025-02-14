'use client';

import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import LinePicker from '../BorderPicker';
import ColorPicker from '../borderSelector/ColorPicker2';
import { arrows } from '@/constant/arrows';
import Cursor from '../../Cursor';

interface Props {
	onClick: (icon: React.ReactNode, text: string) => void;
	selectedIcon?: React.ReactNode;
	onColorChange: (color: string) => void;
	onWidthChange: (width: number) => void;
	currentColor: string;
	currentWidth: number;
}

const Arrows = ({
	onClick,
	selectedIcon,
	onColorChange,
	onWidthChange,
	currentColor,
	currentWidth,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const handleColorChange = (color: string) => {
		onColorChange(color);
	};

	const handleWidthChange = (width: number) => {
		onWidthChange(width);
	};

	return (
		<div ref={containerRef}>
			<ul className="flex items-center max-sm:flex-col gap-2 w-full px-4">
				{arrows.map((item, index) => (
					<li
						key={index}
						className={cn(
							'flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-transparent',
							selectedIcon === item.icon &&
								'border-dotted border-card-border bg-secondary'
						)}
						onClick={() => onClick(item.icon, item.name)}
					>
						{item.icon}
						{item.name}
					</li>
				))}
				<li className="flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer">
					<ColorPicker
						select
						onColorChange={handleColorChange}
						initialColor={currentColor}
					/>
				</li>
				<li className="flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer">
					<LinePicker
						onChange={handleWidthChange}
						initialWidth={currentWidth}
					/>
				</li>
			</ul>
			<Cursor
				selectedColor={currentColor}
				selectedIcon={selectedIcon}
				ref={containerRef}
				positionX={44}
				positionY={18}
				className="[&_svg]:h-[18px] [&_svg]:w-[18px]"
			/>
		</div>
	);
};

export default Arrows;
