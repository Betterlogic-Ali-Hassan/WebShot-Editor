'use client';
import React from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import Shapes from './Shapes';
import { useState } from 'react';
import { shapesData } from '@/constant/shapeData';
import { useStore } from '@/stores/storeProvider';
import { ShapeType } from '@/types/types';
import { observer } from 'mobx-react-lite';

const shapeTypeMap: Record<string, ShapeType> = {
	Square: 'square',
	Rounded: 'roundedSquare',
	Circle: 'circle',
	Star: 'star',
};

const ShapeSelector = observer(() => {
	const { canvasStore } = useStore();
	const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
		shapesData[0].icon
	);
	const [selectedText, setSelectedText] = useState<string>(
		shapesData[0].name
	);

	const handleSelection = (icon: React.ReactNode, text: string) => {
		const shapeType = shapeTypeMap[text];

		if (
			canvasStore.currentTool === 'shape' &&
			canvasStore.shapeDrawingState.shapeType === shapeType
		) {
			canvasStore.currentTool = 'select';
		} else {
			setSelectedIcon(icon);
			setSelectedText(text);
			canvasStore.currentTool = 'shape';
			canvasStore.setShapeType(shapeType);
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text={selectedText}
					icon={selectedIcon}
					id={10}
					isActive={canvasStore.currentTool === 'shape'}
				/>
			}
			content={
				<Shapes
					onClick={handleSelection}
					selectedIcon={selectedIcon}
					onColorChange={(color) =>
						canvasStore.setShapeStrokeColor(color)
					}
					onWidthChange={(width) =>
						canvasStore.setShapeStrokeWidth(width)
					}
					currentColor={canvasStore.shapeDrawingState.strokeColor}
					currentWidth={canvasStore.shapeDrawingState.strokeWidth}
				/>
			}
			id="shape-selector"
		/>
	);
});

export default ShapeSelector;
