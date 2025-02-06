'use client';

import React from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import Numbers from './Numbers';
import { Number } from '@/components/svgs';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const NumberSelector = observer(() => {
	const { canvasStore } = useStore();

	const handleCardClick = () => {
		if (canvasStore.currentTool === 'number') {
			canvasStore.currentTool = 'select';
		} else {
			canvasStore.currentTool = 'number';
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text="Number"
					icon={<Number />}
					id={6}
					isActive={canvasStore.currentTool === 'number'}
					onClick={handleCardClick}
				/>
			}
			content={<Numbers />}
			id="num112s"
		/>
	);
});

export default NumberSelector;
