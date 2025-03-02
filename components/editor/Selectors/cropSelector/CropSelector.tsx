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

			if (canvasStore.cropState.visibleArea) {
				canvasStore.initCropFromVisibleArea();

				const overlayCanvas = document.querySelector(
					'canvas[style*="pointerEvents: none"]'
				) as HTMLCanvasElement;
				if (overlayCanvas) {
					const ctx = overlayCanvas.getContext('2d');
					if (ctx && canvasStore.cropState.previewBounds) {
						const bounds = canvasStore.cropState.previewBounds;

						ctx.clearRect(
							0,
							0,
							overlayCanvas.width,
							overlayCanvas.height
						);

						ctx.strokeStyle = '#0088ff';
						ctx.lineWidth = 2;
						ctx.strokeRect(
							bounds.x,
							bounds.y,
							bounds.width,
							bounds.height
						);

						const handlePositions = [
							{ x: bounds.x, y: bounds.y },
							{ x: bounds.x + bounds.width / 2, y: bounds.y },
							{ x: bounds.x + bounds.width, y: bounds.y },
							{ x: bounds.x, y: bounds.y + bounds.height / 2 },
							{
								x: bounds.x + bounds.width,
								y: bounds.y + bounds.height / 2,
							},
							{ x: bounds.x, y: bounds.y + bounds.height },
							{
								x: bounds.x + bounds.width / 2,
								y: bounds.y + bounds.height,
							},
							{
								x: bounds.x + bounds.width,
								y: bounds.y + bounds.height,
							},
						];

						const scale = canvasStore.canvasState.zoom / 100;
						const handleSize = 10 * scale;

						handlePositions.forEach((handle) => {
							ctx.beginPath();
							ctx.fillStyle = '#fff';
							ctx.strokeStyle = '#0088ff';
							ctx.lineWidth = 1;

							ctx.arc(
								handle.x,
								handle.y,
								handleSize / 2,
								0,
								Math.PI * 2
							);

							ctx.fill();
							ctx.stroke();
						});
					}
				}
			}
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
