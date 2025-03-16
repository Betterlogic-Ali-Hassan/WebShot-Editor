'use client';

import { brushData } from '@/constant/PencilData';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import LinePicker from '../BorderPicker';
import ColorPicker from '../borderSelector/ColorPicker2';
import Cursor from '../../Cursor';
import { DrawingToolType } from '@/types/types';
import { observer } from 'mobx-react-lite';
import { CanvasStore } from '@/stores/canvasStore';

interface Props {
	canvasStore: CanvasStore;
	isToolActive?: boolean;
}

const toolNameToTypeMap = {
	Pencil: 'pencil',
	Brush: 'brush',
	Highlighter: 'highlighter',
} as const;

const Brush = observer(({ canvasStore }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const currentColor = canvasStore.drawingState.color;
	const currentLineWidth = canvasStore.drawingState.lineWidth;
	const currentToolType = canvasStore.drawingState.currentTool || 'pencil';
	const handleToolClick = (item: { name: string }) => {
		const toolType = toolNameToTypeMap[
			item.name as keyof typeof toolNameToTypeMap
		] as DrawingToolType;

		canvasStore.currentTool = 'draw';
		canvasStore.drawingState.currentTool = toolType;
	};

	const handleColorChange = (color: string) => {
		canvasStore.drawingState.color = color;
	};

	const handleLineWidthChange = (width: number) => {
		canvasStore.drawingState.lineWidth = width;
	};

	const toolInfo = brushData.find(
		(item) =>
			toolNameToTypeMap[item.name as keyof typeof toolNameToTypeMap] ===
			currentToolType
	);
	const currentIcon = toolInfo?.icon;

	return (
		<div ref={containerRef}>
			<ul className="flex items-center max-sm:flex-col gap-2 w-full px-4">
				{brushData.map((item, index) => {
					const isSelected =
						toolNameToTypeMap[
							item.name as keyof typeof toolNameToTypeMap
						] === currentToolType;

					return (
						<li
							key={index}
							className={cn(
								'flex items-center gap-1.5 max-sm:w-full rounded-md py-2 px-3 hover:bg-light cursor-pointer text-sm border-2 border-transparent',
								isSelected &&
									'border-dotted border-card-border bg-secondary'
							)}
							onClick={() => handleToolClick(item)}
						>
							{item.icon}
							{item.name}
						</li>
					);
				})}
				<li className="flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer">
					<ColorPicker
						select
						onColorChange={handleColorChange}
						initialColor={currentColor}
					/>
				</li>
				<li className="flex items-center gap-1.5 rounded-md hover:bg-light cursor-pointer">
					<LinePicker
						onChange={handleLineWidthChange}
						initialWidth={currentLineWidth}
					/>
				</li>
			</ul>
			<Cursor
				selectedColor={currentColor}
				selectedIcon={currentIcon}
				ref={containerRef}
				positionX={26}
				positionY={13}
				className="[&_svg]:h-[22px] [&_svg]:w-[22px]"
			/>
		</div>
	);
});

export default Brush;
