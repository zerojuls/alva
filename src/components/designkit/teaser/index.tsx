import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { Colors } from '../colors';
import { Copy, CopySize } from '../copy';
import { Headline, HeadlineLevel, HeadlineTextAlign } from '../headline';

export interface TeaserProps {
	/** @name Button label @default Label */
	buttonLabel: string;

	/** @name Copy text @default Copytext */
	copyText: string;

	/** @name Headline level @default H1 */
	headlineLevel: HeadlineLevel;

	/** @name Headline align @default Left */
	headlineAlign?: HeadlineTextAlign;

	/** @name Headline text @default Headline */
	headlineText: string;

	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledTeaser = styled.div`
	padding: 30px;
	background: ${Colors.White};
	border: 1px solid ${Colors.Grey90};
`;

const StyledHeadline = styled(Headline)`
	margin-bottom: 30px;
`;

const StyledCopy = styled(Copy)`
	margin-bottom: 30px;
`;

export const Teaser: React.StatelessComponent<TeaserProps> = (props): JSX.Element => (
	<StyledTeaser>
		<StyledHeadline level={props.headlineLevel}>{props.headlineText}</StyledHeadline>
		<StyledCopy size={CopySize.Medium}>{props.copyText}</StyledCopy>
		<Button onClick={props.onClick} primary={true}>
			{props.buttonLabel}
		</Button>
	</StyledTeaser>
);
