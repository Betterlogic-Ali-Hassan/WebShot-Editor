'use client';
import React, { useEffect } from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import { useState } from 'react';
import TextArrow from './TextArrow';
import { arrowBox } from '@/constant/arrowBox';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const TextArrowSelector = observer(() => {
	const { canvasStore } = useStore();
	const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
		arrowBox[0].icon
	);
	const [selectedText, setSelectedText] = useState<string>(arrowBox[0].name);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		setIsActive(
			(selectedText === 'Text Arrow' &&
				canvasStore.currentTool === 'textArrow') ||
				(selectedText === 'Page Text' &&
					canvasStore.currentTool === 'pageText')
		);
	}, [canvasStore.currentTool, selectedText]);

	const handleSelection = (icon: React.ReactNode, text: string) => {
		const wasTextArrow = selectedText === 'Text Arrow';
		const wasPageText = selectedText === 'Page Text';

		setSelectedIcon(icon);
		setSelectedText(text);

		if (text === 'Text Arrow') {
			if (wasTextArrow && canvasStore.currentTool === 'textArrow') {
				canvasStore.currentTool = 'select';
			} else {
				canvasStore.currentTool = 'textArrow';
				canvasStore.textArrowState.arrowType = 'straight';
			}
		} else if (text === 'Page Text') {
			if (wasPageText && canvasStore.currentTool === 'pageText') {
				canvasStore.currentTool = 'select';
			} else {
				canvasStore.currentTool = 'select';
			}
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text={selectedText}
					icon={selectedIcon}
					id={100}
					isActive={isActive}
				/>
			}
			content={
				<TextArrow
					onClick={handleSelection}
					selectedIcon={selectedIcon}
					onColorChange={(color) =>
						(canvasStore.textArrowState.strokeColor = color)
					}
					onWidthChange={(width) =>
						(canvasStore.textArrowState.strokeWidth = width)
					}
					currentColor={canvasStore.textArrowState.strokeColor}
					currentWidth={canvasStore.textArrowState.strokeWidth}
				/>
			}
			id="num100"
		/>
	);
});

export default TextArrowSelector;
