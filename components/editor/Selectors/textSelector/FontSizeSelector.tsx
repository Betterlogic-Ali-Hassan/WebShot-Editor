'use client';

import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/storeProvider';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { fontSizes } from '@/constant/fontSize';

const FontSizeSelector = observer(() => {
	const { canvasStore } = useStore();

	const increment = () => {
		const currentIndex = fontSizes.indexOf(canvasStore.textState.fontSize);
		if (currentIndex < fontSizes.length - 1) {
			canvasStore.setTextStyle({ fontSize: fontSizes[currentIndex + 1] });
		}
	};

	const decrement = () => {
		const currentIndex = fontSizes.indexOf(canvasStore.textState.fontSize);
		if (currentIndex > 0) {
			canvasStore.setTextStyle({ fontSize: fontSizes[currentIndex - 1] });
		}
	};

	return (
		<div className="inline-flex items-center max-sm:justify-center">
			<Button
				variant="outline"
				size="icon"
				className="h-9 rounded-none rounded-l-md border-r-0 bg-select hover:bg-light"
				onClick={decrement}
			>
				<Minus className="h-4 w-4" />
			</Button>
			<Select
				value={canvasStore.textState.fontSize.toString()}
				onValueChange={(val) =>
					canvasStore.setTextStyle({ fontSize: parseInt(val) })
				}
			>
				<SelectTrigger className="h-9 w-[72px] rounded-none border px-2 [&>span]:mx-auto [&>svg]:hidden">
					<SelectValue>{canvasStore.textState.fontSize}</SelectValue>
				</SelectTrigger>
				<SelectContent className="bg-bg">
					{fontSizes.map((size) => (
						<SelectItem key={size} value={size.toString()}>
							{size}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				variant="outline"
				size="icon"
				className="h-9 rounded-none rounded-r-md border-l-0 bg-select hover:bg-light"
				onClick={increment}
			>
				<Plus className="h-4 w-4" />
			</Button>
		</div>
	);
});

export default FontSizeSelector;
