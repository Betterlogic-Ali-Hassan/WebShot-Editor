import CopyToast from '@/components/editor/Selectors/exportSelector/CopyToast';
import FilesToast from '@/components/editor/Selectors/exportSelector/FilesToast';
import ShareLink from '@/components/editor/Selectors/exportSelector/ShareLink';
import { Cloud } from '@/components/svgs';

import { BsFiletypeJpg, BsFiletypePng } from 'react-icons/bs';
import { FaRegFilePdf } from 'react-icons/fa';
import { FaRegClipboard } from 'react-icons/fa6';

export const exportData = [
	{
		name: 'Save as JPG',
		icon: <BsFiletypeJpg size={24} />,
		border: false,
		toast: <FilesToast fileName="JPG" />,
		duration: 6000,
	},
	{
		name: 'Save as PNG',
		icon: <BsFiletypePng size={24} />,
		border: false,
		toast: <FilesToast fileName="PNG" />,
		duration: 6000,
	},
	{
		name: 'Save as PDF',
		icon: <FaRegFilePdf size={24} />,
		border: false,
		toast: <FilesToast fileName="PDF" />,
		duration: 6000,
	},
	{
		name: 'Copy to Clipboard',
		icon: <FaRegClipboard size={22} />,
		border: true,
		toast: <CopyToast />,
		duration: 1000,
	},
	{
		name: 'Upload to Cloud',
		icon: <Cloud />,
		border: false,
		toast: <ShareLink />,
		duration: 100000000,
	},
];
