'use client';
import { Resize } from '@/components/svgs';
import React, { useState } from 'react';
import ToolCard from '../../ToolCard';
import ToolDropdown from '@/components/ToolDropdown';
import Resizer from './Resizer';
import { observer } from 'mobx-react-lite';

const ResizerSelector = observer(() => {
	const [id, setId] = useState('num6');

	const handleId = () => {
		setId('num42');
		setTimeout(() => {
			setId('num6');
		}, 1000);
	};

	return (
		<ToolDropdown
			trigger={<ToolCard text="Resize" icon={<Resize />} id={9} />}
			content={<Resizer handleId={handleId} />}
			id={id}
		/>
	);
});

export default ResizerSelector;
