'use client';
import React from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import Brush from './Brush';
import { brushData } from '@/constant/PencilData';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const toolTypeMap = {
	pencil: { name: 'Pencil', index: 0 },
	brush: { name: 'Brush', index: 1 },
	highlighter: { name: 'Highlighter', index: 2 },
};

const PenSelector = observer(() => {
	const { canvasStore } = useStore();

	const currentToolType = canvasStore.drawingState.currentTool || 'pencil';
	const toolInfo = toolTypeMap[currentToolType] || toolTypeMap.pencil;

	const isToolActive = canvasStore.currentTool === 'draw';

	const selectedIcon = brushData[toolInfo.index].icon;
	const selectedText = toolInfo.name;

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
				<Brush canvasStore={canvasStore} isToolActive={isToolActive} />
			}
			id="num4"
			keepOpenAfterInteraction={true}
		/>
	);
});

export default PenSelector;
