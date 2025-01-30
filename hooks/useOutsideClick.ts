import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	onOutsideClick: () => void
) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const headerElement = document.querySelector('.header');

			const isCanvasClick = canvasRef.current
				? canvasRef.current.contains(event.target as Node)
				: false;
			const isHeaderClick = headerElement
				? headerElement.contains(event.target as Node)
				: false;

			if (!isCanvasClick && !isHeaderClick) {
				onOutsideClick();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [canvasRef, onOutsideClick]);
};
