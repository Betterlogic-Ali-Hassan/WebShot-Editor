import React from 'react';
import ToolCard from '../../ToolCard';
import { BlurIcon } from '@/components/svgs';
import ToolDropdown from '@/components/ToolDropdown';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/storeProvider';

const BlurSelector = observer(() => {
	const { canvasStore } = useStore();

	const handleCardClick = () => {
		if (canvasStore.currentTool === 'blur') {
			canvasStore.currentTool = 'select';
		} else {
			canvasStore.currentTool = 'blur';
		}
	};

	return (
		<ToolDropdown
			trigger={
				<ToolCard
					text="Blur"
					icon={<BlurIcon />}
					id={2}
					isActive={canvasStore.currentTool === 'blur'}
					onClick={handleCardClick}
				/>
			}
			isEmpty
			id="909"
		/>
	);
});

export default BlurSelector;
