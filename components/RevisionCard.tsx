import { revisionData } from '@/constant/RevisionData';
import React from 'react';
import Tooltip from './Tooltip';
import { Trash } from 'lucide-react';
import { useStore } from '@/stores/storeProvider';
import { observer } from 'mobx-react-lite';

const RevisionCard = observer(() => {
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

	const handleDelete = () => {
		const selectedLayer = canvasStore.getSelectedLayer();
		if (selectedLayer) {
			canvasStore.removeLayer(selectedLayer.id);
		}
	};

	return (
		<div className="bg-bg flex items-center justify-center gap-2 px-2 focus:outline-none border-border fixed bottom-4 left-1/2 -translate-x-1/2 min-w-[180px] border bg-popover py-2 shadow-md z-40 rounded-full">
			{revisionData.map((item, id) => (
				<Tooltip
					trigger={item.icon}
					key={id}
					content={item.name}
					contentClass="bg-black text-white rounded-full"
					onClick={() => handleClick(item.name)}
				/>
			))}
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
