'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut } from '../../../svgs';
import ZoomSelect from '../../ZoomSelect';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const Zoom = observer(() => {
	const { canvasStore } = useStore();

	const handleZoomChange = (value: number[]) => {
		canvasStore.setZoom(value[0]);
	};

	const adjustZoom = (adjustment: number) => {
		const newZoom = Math.max(
			10,
			Math.min(800, canvasStore.canvasState.zoom + adjustment)
		);
		canvasStore.setZoom(newZoom);
	};

	return (
		<div className="space-y-1 min-w-[350px] py-4 px-3 flex items-center gap-6">
			<ZoomSelect
				zoomLevel={canvasStore.canvasState.zoom}
				setZoomLevel={(value) => canvasStore.setZoom(value)}
			/>
			<div className="flex items-center gap-4 min-w-[200px]">
				<div>
					<Button
						variant="outline"
						size="icon"
						className="size-8 hover:bg-secondary dark:bg-select dark:hover:bg-light disabled:opacity-30 opacity-100"
						aria-label="Decrease value"
						onClick={() => adjustZoom(-10)}
						disabled={canvasStore.canvasState.zoom === 10}
					>
						<ZoomOut />
					</Button>
				</div>
				<Slider
					className="flex-grow"
					value={[canvasStore.canvasState.zoom]}
					min={10}
					max={800}
					step={10}
					onValueChange={handleZoomChange}
				/>
				<div>
					<Button
						variant="outline"
						size="icon"
						className="size-8 hover:bg-secondary dark:bg-select dark:hover:bg-light disabled:opacity-30 opacity-100"
						aria-label="Increase value"
						onClick={() => adjustZoom(10)}
						disabled={canvasStore.canvasState.zoom === 800}
					>
						<ZoomIn />
					</Button>
				</div>
			</div>
		</div>
	);
});

export default Zoom;
