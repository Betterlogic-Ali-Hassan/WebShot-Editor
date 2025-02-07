import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/storeProvider';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { fonts } from '@/constant/Fonts';

const FontSelector = observer(() => {
	const { canvasStore } = useStore();

	return (
		<div className="space-y-2">
			<Select
				value={canvasStore.textState.fontFamily}
				onValueChange={(value) =>
					canvasStore.setTextStyle({ fontFamily: value })
				}
			>
				<SelectTrigger className="w-auto min-w-48 max-w-full border-border">
					<SelectValue placeholder="Select font" />
				</SelectTrigger>
				<SelectContent>
					{fonts.map((font, i) => (
						<SelectItem
							value={font.style}
							key={i}
							style={{ fontFamily: font.style }}
						>
							{font.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});

export default FontSelector;
