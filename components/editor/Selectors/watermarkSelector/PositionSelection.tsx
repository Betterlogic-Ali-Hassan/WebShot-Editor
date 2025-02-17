import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { WatermarkPosition } from '@/types/types';

const PositionSelection = () => {
	const { canvasStore } = useStore();

	const handlePositionChange = (position: WatermarkPosition) => {
		canvasStore.updateWatermarkState({ position });
	};

	return (
		<div className="space-y-2">
			<Label htmlFor="position">Position</Label>
			<Select
				value={canvasStore.watermarkState.position}
				onValueChange={handlePositionChange}
			>
				<SelectTrigger id="position">
					<SelectValue placeholder="Select position" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectItem value="top-left">Top Left</SelectItem>
					<SelectItem value="top-right">Top Right</SelectItem>
					<SelectItem value="bottom-left">Bottom Left</SelectItem>
					<SelectItem value="bottom-right">Bottom Right</SelectItem>
					<SelectItem value="center">Center</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default observer(PositionSelection);
