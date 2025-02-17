'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import PositionSelection from './PositionSelection';
import Sizes from './Sizes';
import ImageUploader from './ImageUploader';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const WatermarkContent = observer(() => {
	const { canvasStore } = useStore();
	const { watermarkState } = canvasStore;

	return (
		<div className="w-full min-w-[280px] px-4">
			<div className="py-4 space-y-6">
				<div className="flex items-center justify-between">
					<Label htmlFor="watermark" className="text-base">
						Watermark
					</Label>
					<Switch
						id="watermark"
						onClick={() =>
							canvasStore.updateWatermarkState({
								isEnabled: !watermarkState.isEnabled,
							})
						}
						checked={watermarkState.isEnabled}
					/>
				</div>
				{watermarkState.isEnabled && (
					<>
						<ImageUploader />
						<PositionSelection />
						<Sizes />
					</>
				)}
			</div>
		</div>
	);
});

export default WatermarkContent;
