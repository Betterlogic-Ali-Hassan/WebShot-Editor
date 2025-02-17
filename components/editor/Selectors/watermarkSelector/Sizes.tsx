// В файле components/editor/Selectors/watermarkSelector/Sizes.tsx
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const Sizes = observer(() => {
	const { canvasStore } = useStore();
	const { size, opacity } = canvasStore.watermarkState;

	const handleSizeChange = (value: number[]) => {
		canvasStore.updateWatermarkState({ size: value[0] });
	};

	const handleOpacityChange = (value: number[]) => {
		canvasStore.updateWatermarkState({ opacity: value[0] });
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>Size</Label>
					<span className="text-sm text-muted-foreground">
						{size}%
					</span>
				</div>
				<Slider
					defaultValue={[size]}
					min={1}
					max={100}
					step={1}
					value={[size]}
					onValueChange={handleSizeChange}
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>Opacity</Label>
					<span className="text-sm text-muted-foreground">
						{opacity}%
					</span>
				</div>
				<Slider
					defaultValue={[opacity]}
					min={1}
					max={100}
					step={1}
					value={[opacity]}
					onValueChange={handleOpacityChange}
				/>
			</div>
		</div>
	);
});

export default Sizes;
