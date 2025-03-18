'use client';
import { revisionData } from '@/constant/RevisionData';
import React, { useState } from 'react';
import Tooltip from './Tooltip';
import { Trash } from 'lucide-react';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const RevisionCard = observer(() => {
	const { canvasStore } = useStore();
	const [undoing, setUndoing] = useState(false);
	const [redoing, setRedoing] = useState(false);
	const [undoingAll, setUndoingAll] = useState(false);

	const handleClick = (name: string) => {
		switch (name) {
			case 'Undo':
				if (canvasStore.canUndo() && !undoing) {
					setUndoing(true);
					canvasStore.undo();
					setTimeout(() => setUndoing(false), 200);
				}
				break;
			case 'Redo':
				if (canvasStore.canRedo() && !redoing) {
					setRedoing(true);
					canvasStore.redo();
					setTimeout(() => setRedoing(false), 200);
				}
				break;
			case 'UndoAll':
				if (canvasStore.canUndo() && !undoingAll) {
					setUndoingAll(true);
					canvasStore.undoAll();
					setTimeout(() => setUndoingAll(false), 200);
				}
				break;
		}
	};

	const handleDelete = () => {
		const selectedLayer = canvasStore.getSelectedLayer();
		if (selectedLayer) {
			canvasStore.removeLayer(selectedLayer.id);
		}
	};

	return (
		<div className="bg-bg flex items-center justify-center gap-2 px-2 focus:outline-none border-border fixed bottom-4 left-1/2 -translate-x-1/2 min-w-[180px] border bg-popover py-2 shadow-md z-40 rounded-full">
			{revisionData.map((item, id) => {
				let isDisabled = false;
				let isActive = false;

				if (item.name === 'Undo') {
					isDisabled = !canvasStore.canUndo();
					isActive = undoing;
				} else if (item.name === 'Redo') {
					isDisabled = !canvasStore.canRedo();
					isActive = redoing;
				} else if (item.name === 'UndoAll') {
					isDisabled = !canvasStore.canUndo();
					isActive = undoingAll;
				}

				return (
					<Tooltip
						trigger={item.icon}
						key={id}
						content={item.name}
						contentClass="bg-black text-white rounded-full"
						onClick={() => handleClick(item.name)}
						className={`${
							isDisabled ? 'opacity-50 cursor-not-allowed' : ''
						} ${isActive ? 'bg-light' : ''}`}
					/>
				);
			})}
			<Tooltip
				trigger={<Trash size={20} className="!fill-none text-dark" />}
				content="Delete"
				contentClass="bg-black text-white rounded-full"
				onClick={handleDelete}
			/>
		</div>
	);
});

export default RevisionCard;
