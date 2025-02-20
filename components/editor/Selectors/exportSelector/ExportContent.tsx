import { exportData } from '@/constant/ExportData';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/stores/storeProvider';
import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { cn } from '@/lib/utils';

const ExportContent = observer(() => {
	const { canvasStore } = useStore();
	const { toast } = useToast();
	const isExporting = useRef(false);

	const handleClick = async (name: string) => {
		if (isExporting.current) return;

		try {
			isExporting.current = true;
			console.log('Handling click for:', name);

			switch (name) {
				case 'Save as PNG':
					await canvasStore.exportToImage('image/png');
					break;
				case 'Save as JPG':
					await canvasStore.exportToImage('image/jpeg');
					break;
				case 'Copy to Clipboard':
					await canvasStore.copyToClipboard();
					break;
				case 'Save as PDF':
					console.log('PDF export not implemented yet');
					break;
				case 'Upload to Cloud':
					console.log('Cloud upload not implemented yet');
					break;
			}

			const exportItem = exportData.find((item) => item.name === name);
			if (exportItem) {
				toast({
					description: exportItem.toast,
					duration: exportItem.duration,
				});
			}
		} catch (error) {
			console.error('Export operation failed:', error);
		} finally {
			isExporting.current = false;
		}
	};

	return (
		<ul className="flex flex-col gap-0.5 min-w-[180px]">
			{exportData.map((item, index) => (
				<li
					onClick={() => handleClick(item.name)}
					key={index}
					className={cn(
						'flex items-center gap-3 py-2 px-3 hover:bg-light cursor-pointer text-sm',
						item.border &&
							'border-b border-t dark:border-secondary py-[10px] mt-1'
					)}
				>
					{item.icon}
					{item.name}
				</li>
			))}
		</ul>
	);
});

export default ExportContent;
