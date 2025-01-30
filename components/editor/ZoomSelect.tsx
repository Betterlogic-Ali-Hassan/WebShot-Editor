'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { percentage } from '@/constant/Percentage';
import { observer } from 'mobx-react-lite';

interface ZoomSelectProps {
	zoomLevel: number;
	setZoomLevel: (value: number) => void;
}

const ZoomSelect = observer(({ zoomLevel, setZoomLevel }: ZoomSelectProps) => {
	return (
		<Select
			value={zoomLevel.toString()}
			onValueChange={(value) => setZoomLevel(Number(value))}
		>
			<SelectTrigger className="w-[100px]">
				<SelectValue>{zoomLevel}%</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{percentage.map((zoom) => (
					<SelectItem key={zoom} value={zoom.toString()}>
						{zoom}%
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
});

export default ZoomSelect;
