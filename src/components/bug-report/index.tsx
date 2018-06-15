import { Button, ButtonOrder, ButtonSize } from '../button';
import * as React from 'react';
import { getSpace, SpaceSize } from '../space';
import styled from 'styled-components';

export interface BugReportProps {
	onClick?: React.MouseEventHandler<HTMLElement>;
	title: string;
}

const StyledBugReport = styled.div`
	justify-self: right;
	margin: 0 ${getSpace(SpaceSize.S)}px;
`;

export const BugReport: React.StatelessComponent<BugReportProps> = props => (
	<StyledBugReport>
		<Button order={ButtonOrder.Secondary} size={ButtonSize.Small} onClick={props.onClick}>
			{props.title}
		</Button>
	</StyledBugReport>
);
