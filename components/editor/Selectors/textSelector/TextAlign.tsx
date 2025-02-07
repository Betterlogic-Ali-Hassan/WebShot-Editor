import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/storeProvider';
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const TextAlign = observer(() => {
	const { canvasStore } = useStore();
	const { textState } = canvasStore;

	const handleAlignmentChange = (value: string) => {
		if (value) {
			canvasStore.setTextStyle({
				alignment: value as 'left' | 'center' | 'right',
			});
		}
	};

	return (
		<ToggleGroup
			type="single"
			value={textState.alignment}
			onValueChange={handleAlignmentChange}
		>
			<ToggleGroupItem
				value="left"
				aria-label="Align left"
				variant="outline"
				className="data-[state=on]:bg-secondary hover:bg-secondary dark:bg-select dark:hover:bg-light border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
			>
				<FiAlignLeft size={24} />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="center"
				aria-label="Align center"
				variant="outline"
				className="data-[state=on]:bg-secondary hover:bg-secondary dark:bg-select dark:hover:bg-light border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
			>
				<FiAlignCenter className="h-5 w-5" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="right"
				aria-label="Align right"
				variant="outline"
				className="data-[state=on]:bg-secondary hover:bg-secondary dark:bg-select dark:hover:bg-light border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
			>
				<FiAlignRight size={24} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
});

export default TextAlign;
