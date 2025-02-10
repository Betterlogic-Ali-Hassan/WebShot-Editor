import { revisionData } from '@/constant/RevisionData';
import React from 'react';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const Revision = observer(() => {
	const { canvasStore } = useStore();

	const handleClick = (name: string) => {
		switch (name) {
			case 'Undo':
				canvasStore.undo();
				break;
			case 'Redo':
				canvasStore.redo();
				break;
			case 'UndoAll':
				canvasStore.undoAll();
				break;
		}
	};

	return (
		<ul className="flex flex-col gap-0.5 w-full">
			{revisionData.map((item, index) => (
				<li
					key={index}
					className="flex items-center gap-3 py-2 px-3 hover:bg-light cursor-pointer text-sm"
					onClick={() => handleClick(item.name)}
				>
					{item.icon}
					{item.name}
				</li>
			))}
		</ul>
	);
});

export default Revision;
