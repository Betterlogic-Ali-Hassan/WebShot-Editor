'use client';

import React from 'react';
import ToolCard from '../../ToolCard';
import { Crop } from '@/components/svgs';
import ToolDropdown from '@/components/ToolDropdown';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const CropSelector = observer(() => {
	const { canvasStore } = useStore();

	const handleCardClick = () => {
		if (canvasStore.currentTool === 'crop') {
			canvasStore.currentTool = 'select';
		} else {
			canvasStore.currentTool = 'crop';
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text="Crop"
					icon={<Crop />}
					id={4}
					isActive={canvasStore.currentTool === 'crop'}
					onClick={handleCardClick}
				/>
			}
			isEmpty
			id="804"
		/>
	);
});

export default CropSelector;
