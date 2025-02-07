import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/storeProvider';
import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdOutlineStrikethroughS,
} from 'react-icons/md';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const TextEditor = observer(() => {
	const { canvasStore } = useStore();
	const { textState } = canvasStore;

	const handleValueChange = (value: string[]) => {
		canvasStore.setTextStyle({
			bold: value.includes('bold'),
			italic: value.includes('italic'),
		});
	};

	const currentValue = [
		...(textState.bold ? ['bold'] : []),
		...(textState.italic ? ['italic'] : []),
	];

	return (
		<ToggleGroup
			variant="outline"
			type="multiple"
			value={currentValue}
			onValueChange={handleValueChange}
		>
			<ToggleGroupItem
				value="bold"
				aria-label="Toggle bold"
				className="data-[state=on]:bg-secondary dark:bg-select dark:hover:bg-light hover:bg-secondary border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
			>
				<MdFormatBold />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="italic"
				aria-label="Toggle italic"
				className="data-[state=on]:bg-secondary dark:bg-select dark:hover:bg-light hover:bg-secondary border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
			>
				<MdFormatItalic />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="underline"
				aria-label="Toggle underline"
				className="data-[state=on]:bg-secondary hover:bg-secondary dark:bg-select dark:hover:bg-light border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
				disabled
			>
				<MdFormatUnderlined />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="strikethrough"
				aria-label="Toggle strikethrough"
				className="data-[state=on]:bg-secondary dark:bg-select dark:hover:bg-light hover:bg-secondary border data-[state=on]:border-2 data-[state=on]:border-dotted data-[state=on]:border-card-border [&_svg]:size-5"
				disabled
			>
				<MdOutlineStrikethroughS />
			</ToggleGroupItem>
		</ToggleGroup>
	);
});

export default TextEditor;
