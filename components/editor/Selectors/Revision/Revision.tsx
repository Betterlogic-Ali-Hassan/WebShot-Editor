'use client';
import { revisionData } from '@/constant/RevisionData';
import React, { useState } from 'react';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';
import { cn } from '@/lib/utils';

const Revision = observer(() => {
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

	return (
		<ul className="flex flex-col gap-0.5 w-full">
			{revisionData.map((item, index) => {
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
					<li
						key={index}
						className={cn(
							'flex items-center gap-3 py-2 px-3 hover:bg-light cursor-pointer text-sm',
							isDisabled && 'opacity-50 cursor-not-allowed',
							isActive && 'bg-light'
						)}
						onClick={() => !isDisabled && handleClick(item.name)}
					>
						{item.icon}
						{item.name}
					</li>
				);
			})}
		</ul>
	);
});

export default Revision;
