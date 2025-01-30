'use client';
import React from 'react';
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

	const handleSelection = (
		icon: React.ReactNode,
		text: string,
		toolType: DrawingToolType
	) => {
		setSelectedIcon(icon);
		setSelectedText(text);
		canvasStore.currentTool = 'draw'; // переключаем в режим рисования
		canvasStore.drawingState.currentTool = toolType; // устанавливаем тип инструмента
	};

	const handleColorChange = (color: string) => {
		canvasStore.drawingState.color = color;
	};

	const handleLineWidthChange = (width: number) => {
		canvasStore.drawingState.lineWidth = width;
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard text={selectedText} icon={selectedIcon} id={7} />
			}
			content={
				<Brush
					onClick={handleSelection}
					selectedIcon={selectedIcon}
					onColorChange={handleColorChange}
					onLineWidthChange={handleLineWidthChange}
				/>
			}
			id="num4"
		/>
	);
});

export default PenSelector;
