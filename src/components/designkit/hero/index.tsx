import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../colors';
import { Copy, CopySize } from '../copy';
import { Headline, HeadlineLevel, HeadlineTextAlign } from '../headline';

export interface HeroProps {
	/** @name Copy text */
	copyText: string;
	/** @name Headline level */
	headlineLevel: HeadlineLevel;
	/** @name Headline align */
	headlineAlign?: HeadlineTextAlign;
	/** @name Headline text */
	headlineText: string;
}

const StyledHero = styled.div`
	padding: 30px;
	background: ${Colors.Blue};
	color: ${Colors.White};
	text-align: center;
`;

export const Hero: React.StatelessComponent<HeroProps> = props => (
	<StyledHero>
		<Headline level={props.headlineLevel} textAlign={props.headlineAlign}>
			{props.headlineText}
		</Headline>
		<Copy size={CopySize.Medium}>{props.copyText}</Copy>
	</StyledHero>
);
