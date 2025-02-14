'use client';
import React from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import Arrows from './Arrows';
import { useState } from 'react';
import { arrows } from '@/constant/arrows';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { ArrowType } from '@/types/types';

const arrowTypeMap: Record<string, ArrowType> = {
	'Arrow Line': 'straight',
	'Arrow Curve': 'curved',
	'Double Arrow': 'double',
	Line: 'line',
	'Curve Line': 'curvedLine',
	'Dotted Line': 'dashed',
};

const ArrowSelector = observer(() => {
	const { canvasStore } = useStore();
	const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
		arrows[0].icon
	);
	const [selectedText, setSelectedText] = useState<string>(arrows[0].name);

	const handleSelection = (icon: React.ReactNode, text: string) => {
		setSelectedIcon(icon);
		setSelectedText(text);
		if (
			canvasStore.currentTool === 'arrow' &&
			canvasStore.arrowState.arrowType === arrowTypeMap[text]
		) {
			canvasStore.currentTool = 'select';
		} else {
			canvasStore.currentTool = 'arrow';
			canvasStore.arrowState.arrowType = arrowTypeMap[text];
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text={selectedText}
					icon={selectedIcon}
					id={1}
					isActive={canvasStore.currentTool === 'arrow'}
				/>
			}
			content={
				<Arrows
					onClick={handleSelection}
					selectedIcon={selectedIcon}
					onColorChange={(color) =>
						(canvasStore.arrowState.strokeColor = color)
					}
					onWidthChange={(width) =>
						(canvasStore.arrowState.strokeWidth = width)
					}
					currentColor={canvasStore.arrowState.strokeColor}
					currentWidth={canvasStore.arrowState.strokeWidth}
				/>
			}
			id="num1"
		/>
	);
});

export default ArrowSelector;
