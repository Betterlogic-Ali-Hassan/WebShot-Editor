'use client';

import { brushData } from '@/constant/PencilData';
import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';
import LinePicker from '../BorderPicker';
import ColorPicker from '../borderSelector/ColorPicker2';
import Cursor from '../../Cursor';
import { DrawingToolType } from '@/types/types';
import { useStore } from '@/stores/storeProvider';

interface Props {
	onClick: (
		icon: React.ReactNode,
		text: string,
		toolType: DrawingToolType
	) => void;
	selectedIcon?: React.ReactNode;
	onColorChange: (color: string) => void;
	onLineWidthChange: (width: number) => void;
	isToolActive?: boolean;
}

const toolTypeMap = {
	Pencil: 'pencil',
	Brush: 'brush',
	Highlighter: 'highlighter',
} as const;

const Brush = ({
	onClick,
	selectedIcon,
	onColorChange,
	onLineWidthChange,
	isToolActive = false,
}: Props) => {
	const { canvasStore } = useStore();
	const [selectedColor, setSelectedColor] = useState('rgba(0, 0, 0, 1)');
	const [selectedName, setSelectedName] = useState<string>('Pencil');

	useEffect(() => {
		onColorChange(selectedColor);

		const currentTool = brushData.find(
			(item) => item.icon === selectedIcon
		);
		if (currentTool) {
			setSelectedName(currentTool.name);
		}
	}, [selectedIcon, onColorChange, selectedColor]);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleColorChange = (color: string) => {
		setSelectedColor(color);
		onColorChange(color);

		if (isToolActive) {
			const toolType =
				toolTypeMap[selectedName as keyof typeof toolTypeMap] ||
				'pencil';
			canvasStore.currentTool = 'draw';
			canvasStore.drawingState.currentTool = toolType;
		}
	};

	const handleLineWidthChange = (value: number) => {
		onLineWidthChange(value);

		if (isToolActive) {
			const toolType =
				toolTypeMap[selectedName as keyof typeof toolTypeMap] ||
				'pencil';
			canvasStore.currentTool = 'draw';
			canvasStore.drawingState.currentTool = toolType;
		}
	};

	const handleToolClick = (item: { name: string; icon: React.ReactNode }) => {
		setSelectedName(item.name);
		const toolType = toolTypeMap[item.name as keyof typeof toolTypeMap];
		onClick(item.icon, item.name, toolType);
	};

	return (
		<div ref={containerRef}>
			<ul className="flex items-center max-sm:flex-col gap-2 w-full px-4">
				{brushData.map((item, index) => (
					<li
						key={index}
						className={cn(
							'flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-transparent',
							selectedIcon === item.icon &&
								'border-dotted border-card-border bg-secondary'
						)}
						onClick={() => handleToolClick(item)}
					>
						{item.icon}
						{item.name}
					</li>
				))}
				<li className="flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer">
					<ColorPicker
						select
						onColorChange={handleColorChange}
						initialColor="rgba(0, 0, 0, 1)"
					/>
				</li>
				<li className="flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer">
					<LinePicker onChange={handleLineWidthChange} />
				</li>
			</ul>
			<Cursor
				selectedColor={selectedColor}
				selectedIcon={selectedIcon}
				ref={containerRef}
				positionX={26}
				positionY={13}
				className="[&_svg]:h-[22px] [&_svg]:w-[22px]"
			/>
		</div>
	);
};

export default Brush;
