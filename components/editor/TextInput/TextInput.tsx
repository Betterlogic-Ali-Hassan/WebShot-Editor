import React, { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/storeProvider';

interface TextInputProps {
	position: {
		x: number;
		y: number;
	};
	onFinish: () => void;
}

const TextInput = observer(({ position, onFinish }: TextInputProps) => {
	const { canvasStore } = useStore();
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const measureRef = useRef<HTMLSpanElement>(null);

	const updateTextAreaSize = useCallback(() => {
		if (!inputRef.current || !measureRef.current) return;

		const text = canvasStore.textState.currentText || ' ';
		measureRef.current.textContent = text;

		const styles = window.getComputedStyle(measureRef.current);
		const width = parseFloat(styles.width);
		const height = parseFloat(styles.height);

		inputRef.current.style.width = `${Math.max(width + 4, 20)}px`;
		inputRef.current.style.height = `${Math.max(
			height + 4,
			canvasStore.textState.fontSize + 4
		)}px`;
	}, [canvasStore.textState.currentText, canvasStore.textState.fontSize]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
			updateTextAreaSize();
		}
	}, [updateTextAreaSize]);

	useEffect(() => {
		updateTextAreaSize();
	}, [
		canvasStore.textState.currentText,
		canvasStore.textState.fontSize,
		canvasStore.textState.fontFamily,
		canvasStore.textState.bold,
		canvasStore.textState.italic,
		updateTextAreaSize,
	]);

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		canvasStore.updateTextContent(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onFinish();
		}
		if (e.key === 'Escape') {
			onFinish();
		}
	};

	const handleBlur = () => {
		onFinish();
	};

	const getInputStyles = (): React.CSSProperties => {
		const { fontSize, fontFamily, color, bold, italic, alignment } =
			canvasStore.textState;

		return {
			position: 'absolute',
			left: `${position.x}px`,
			top: `${position.y}px`,
			padding: '2px',
			margin: 0,
			background: '#fff',
			border: 'none',
			outline: 'none',
			resize: 'none',
			overflow: 'hidden',
			fontFamily,
			fontSize: `${fontSize}px`,
			color,
			fontWeight: bold ? 'bold' : 'normal',
			fontStyle: italic ? 'italic' : 'normal',
			textAlign: alignment,
			zIndex: 1000,
			minWidth: '20px',
			minHeight: `${fontSize + 4}px`,
		};
	};

	const getMeasureStyles = (): React.CSSProperties => {
		const { fontSize, fontFamily, bold, italic } = canvasStore.textState;

		return {
			position: 'absolute',
			left: '-9999px',
			whiteSpace: 'pre',
			fontFamily,
			fontSize: `${fontSize}px`,
			fontWeight: bold ? 'bold' : 'normal',
			fontStyle: italic ? 'italic' : 'normal',
		};
	};
	const handleCopy = useCallback(
		(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
			e.preventDefault();

			const textarea = e.currentTarget;
			const selectedText = textarea.value.substring(
				textarea.selectionStart,
				textarea.selectionEnd
			);

			if (selectedText) {
				navigator.clipboard.writeText(selectedText).catch((error) => {
					console.error('Failed to copy text:', error);
				});
			}
		},
		[]
	);

	const handlePaste = useCallback(
		(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
			e.preventDefault();

			const textarea = e.currentTarget;
			const cursorPosition = textarea.selectionStart;
			const currentText = textarea.value;

			navigator.clipboard
				.readText()
				.then((clipboardText) => {
					const processedText = clipboardText.replace(
						/\t/g,
						'        '
					);

					const newText =
						currentText.substring(0, cursorPosition) +
						processedText +
						currentText.substring(textarea.selectionEnd);

					canvasStore.updateTextContent(newText);

					setTimeout(() => {
						textarea.selectionStart =
							cursorPosition + processedText.length;
						textarea.selectionEnd =
							cursorPosition + processedText.length;
					}, 0);
				})
				.catch((error) => {
					console.error('Failed to paste text:', error);
				});
		},
		[canvasStore]
	);
	return (
		<>
			<textarea
				ref={inputRef}
				value={canvasStore.textState.currentText}
				onChange={handleInput}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				onCopy={handleCopy}
				onPaste={handlePaste}
				style={getInputStyles()}
				rows={1}
			/>
			<span
				ref={measureRef}
				style={getMeasureStyles()}
				aria-hidden="true"
			/>
		</>
	);
});

export default TextInput;
