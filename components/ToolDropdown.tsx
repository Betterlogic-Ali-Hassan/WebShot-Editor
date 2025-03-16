'use client';

import React from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { usePopover } from '@/context/PopOverContext';
import { X } from 'lucide-react';

interface ToolDropdownProps {
	trigger: React.ReactNode;
	content?: React.ReactNode;
	id: string;
	isEmpty?: boolean;
	keepOpenAfterInteraction?: boolean;
}

const AUTO_CLOSE_IDS = ['num14', 'num7', 'num6', 'num13', 'num2'];
const FORCE_CLOSE_IDS = ['num27', 'num43'];

const ToolDropdown = ({
	trigger,
	content,
	id,
	isEmpty = false,
	keepOpenAfterInteraction = false,
}: ToolDropdownProps) => {
	const { openPopoverId, setOpenPopoverId } = usePopover();

	const isOpen = openPopoverId === id;
	const shouldAutoClose =
		AUTO_CLOSE_IDS.includes(id) && !keepOpenAfterInteraction;
	const shouldForceClose = FORCE_CLOSE_IDS.includes(id);
	const shouldShowCrossIcon = !shouldAutoClose;

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setOpenPopoverId(id);
			const event = new CustomEvent('popoverOpen', { detail: id });
			document.dispatchEvent(event);
		} else if (shouldAutoClose) {
			setOpenPopoverId(null);
		}
	};

	const handleContentClick = () => {
		if (shouldForceClose) {
			setOpenPopoverId(null);
		}
	};

	const handleEmptyTriggerClick = () => {
		if (isEmpty) {
			setOpenPopoverId(null);
		}
	};

	React.useEffect(() => {
		if (id === 'num42') {
			setOpenPopoverId(null);
		}
	}, [id, setOpenPopoverId]);

	if (isEmpty) {
		return <div onClick={handleEmptyTriggerClick}>{trigger}</div>;
	}

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger className="focus:outline-none">
				{trigger}
			</PopoverTrigger>
			{content && (
				<PopoverContent
					className="bg-card max-h-[350px] overflow-y-auto overflow-x-hidden scrollbar focus:outline-none border-border"
					onClick={handleContentClick}
				>
					{content}
					{shouldShowCrossIcon && (
						<button
							className="absolute top-0 right-[4px] p-[5px] mt-4 rounded-full border bg-secondary shadow-md hover:bg-light focus:outline-none"
							onClick={() => setOpenPopoverId(null)}
						>
							<X size={16} />
						</button>
					)}
				</PopoverContent>
			)}
		</Popover>
	);
};
export default ToolDropdown;
