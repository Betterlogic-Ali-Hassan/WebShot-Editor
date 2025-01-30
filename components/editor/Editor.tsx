import React, { forwardRef, type ReactNode } from 'react';
import ToolCards from './ToolCards';
import { observer } from 'mobx-react-lite';

interface Props {
	children?: ReactNode;
}

const Editor = observer(
	forwardRef<HTMLDivElement, Props>(function Editor(props, ref) {
		return (
			<header ref={ref} className="fixed header w-full top-0 z-50">
				<ToolCards />
				{props.children}
			</header>
		);
	})
);

export default Editor;
