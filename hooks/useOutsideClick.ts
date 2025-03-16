import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	onOutsideClick: () => void
) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const headerElement = document.querySelector('.header');

			const popoverElement = document.querySelector('.tool');
			const colorPickerElement =
				document.querySelector('.react-colorful');
			const popoverContentElement = document.querySelector('.bg-card');

			const isCanvasClick = canvasRef.current
				? canvasRef.current.contains(event.target as Node)
				: false;
			const isHeaderClick = headerElement
				? headerElement.contains(event.target as Node)
				: false;
			const isPopoverClick = popoverElement
				? popoverElement.contains(event.target as Node)
				: false;
			const isColorPickerClick = colorPickerElement
				? colorPickerElement.contains(event.target as Node)
				: false;
			const isPopoverContentClick = popoverContentElement
				? popoverContentElement.contains(event.target as Node)
				: false;

			if (
				!isCanvasClick &&
				!isHeaderClick &&
				!isPopoverClick &&
				!isColorPickerClick &&
				!isPopoverContentClick
			) {
				const target = event.target as HTMLElement;
				const isUIElement =
					target.closest('.popover') ||
					target.closest('.dropdown') ||
					target.closest('.react-colorful') ||
					target.closest('.tool') ||
					target.closest('.bg-card') ||
					target.closest('[data-radix-popper-content-wrapper]');

				if (!isUIElement) {
					onOutsideClick();
				}
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [canvasRef, onOutsideClick]);
};
