import * as React from 'react';
import { Copy, CopySize, CopyTextAlign } from './index';

const CopyDemo: React.StatelessComponent<void> = (): JSX.Element => (
	<div>
		<Copy size={CopySize.Small}>
			CopySize.S
			<div />
			Lorem ipsum dolor sit, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
			ut labore et dolore magna aliquyam erat, sed diam voluptua.
		</Copy>
		<Copy>
			CopySize.M
			<div />
			Lorem ipsum dolor sit, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
			ut labore et dolore magna aliquyam erat, sed diam voluptua.
		</Copy>
		<Copy textAlign={CopyTextAlign.Right}>Lorem</Copy>
		<Copy uppercase>Lorem Ipsum</Copy>
	</div>
);

export default CopyDemo;
