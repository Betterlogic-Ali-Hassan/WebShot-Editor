'use client';
import React, { useEffect } from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import Brush from './Brush';
import { useState } from 'react';
import { brushData } from '@/constant/PencilData';
import { useStore } from '@/stores/storeProvider';
import { DrawingToolType } from '@/types/types';
import { observer } from 'mobx-react-lite';

const PenSelector = observer(() => {
	const { canvasStore } = useStore();
	const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
		brushData[0].icon
	);
	const [selectedText, setSelectedText] = useState<string>(brushData[0].name);
	const [isToolActive, setIsToolActive] = useState(false);

	useEffect(() => {
		setIsToolActive(canvasStore.currentTool === 'draw');
	}, [canvasStore.currentTool]);

	const handleSelection = (
		icon: React.ReactNode,
		text: string,
		toolType: DrawingToolType
	) => {
		setSelectedIcon(icon);
		setSelectedText(text);
		canvasStore.currentTool = 'draw';
		canvasStore.drawingState.currentTool = toolType;
		setIsToolActive(true);
	};

	const handleColorChange = (color: string) => {
		canvasStore.drawingState.color = color;

		if (isToolActive) {
			canvasStore.currentTool = 'draw';
		}
	};

	const handleLineWidthChange = (width: number) => {
		canvasStore.drawingState.lineWidth = width;

		if (isToolActive) {
			canvasStore.currentTool = 'draw';
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text={selectedText}
					icon={selectedIcon}
					id={7}
					isActive={isToolActive}
				/>
			}
			content={
				<Brush
					onClick={handleSelection}
					selectedIcon={selectedIcon}
					onColorChange={handleColorChange}
					onLineWidthChange={handleLineWidthChange}
					isToolActive={isToolActive}
				/>
			}
			id="num4"
			keepOpenAfterInteraction={true}
		/>
	);
});

export default PenSelector;
