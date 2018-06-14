import * as React from 'react';
import styled, { css, StyledComponentClass } from 'styled-components';
import { Fonts } from '../fonts';

export interface HeadlineProps {
	/** @name CSS class @hidden */
	className?: string;

	/** @name Level @default H1 */
	level: HeadlineLevel;

	/** @name Text align @default Left */
	textAlign?: HeadlineTextAlign;

	/** @name Color @default #000000 */
	color?: string;

	/** @name Uppercase @default false */
	uppercase?: boolean;
	children?: React.ReactNode;
}

export enum HeadlineLevel {
	H1,
	H2,
	H3
}

export enum HeadlineTextAlign {
	Left,
	Center,
	Right
}

const StyledHeadline = styled.div`
	margin-top: 0;
	font-family: ${Fonts.NormalFont};
	font-weight: 500;
	color: ${(props: HeadlineProps) => props.color || 'inherit'};

	${(props: HeadlineProps) => {
		switch (props.level) {
			case HeadlineLevel.H3:
				return css`
					font-size: 18px;
					line-height: 24px;
				`;
			case HeadlineLevel.H2:
				return css`
					font-size: 42px;
					line-height: 48px;
				`;
			case HeadlineLevel.H1:
			default:
				return css`
					font-size: 96px;
					line-height: 132px;
				`;
		}
	}};

	${(props: HeadlineProps) => {
		switch (props.textAlign) {
			case HeadlineTextAlign.Center:
				return css`
					text-align: center;
				`;
			case HeadlineTextAlign.Right:
				return css`
					text-align: right;
				`;
			case HeadlineTextAlign.Left:
				return css`
					text-align: left;
				`;
			default:
				return css`
					text-align: inherit;
				`;
		}
	}};

	${(props: HeadlineProps) =>
		props.uppercase
			? `letter-spacing: 1px;
				text-transform: uppercase;`
			: ''};
`;

type HeadlineComponent = StyledComponentClass<HeadlineProps, HeadlineProps>;

export const Headline: React.StatelessComponent<HeadlineProps> = props => {
	const Component: HeadlineComponent = getComponent(props.level);

	return <Component {...props}>{props.children}</Component>;
};

const getComponent = (level: HeadlineLevel): HeadlineComponent =>
	StyledHeadline.withComponent(getTagName(level));

const getTagName = (level: HeadlineLevel): 'h1' | 'h2' | 'h3' => {
	switch (level) {
		case HeadlineLevel.H3:
			return 'h3';
		case HeadlineLevel.H2:
			return 'h2';
		case HeadlineLevel.H1:
		default:
			return 'h1';
	}
};
