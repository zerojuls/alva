import * as React from 'react';
import styled, { css, StyledComponentClass } from 'styled-components';
import { Fonts } from '../fonts';

export interface CopyProps {
	/** @name CSS Class @ignore */
	className?: string;

	/** @name Copy Size @default Medium */
	size?: CopySize;

	/** @name Tag Name @ignore */
	tagName?: string;

	/** @name Text Align @default Left */
	textAlign?: CopyTextAlign;

	/** @name Color @default #000000 */
	color?: string;

	/** @name Uppercase @default false */
	uppercase?: boolean;

	children?: React.ReactNode;
}

interface CopyProxyProps {
	className?: string;
	tagName: string;
}

export enum CopySize {
	Small,
	Medium
}

export enum CopyTextAlign {
	Left,
	Center,
	Right
}

// The proxy component is used to rendering styled componentes with variable
// tag names.
const CopyProxy: React.StatelessComponent<CopyProxyProps> = props => {
	const ProxyComponent = props.tagName;

	return <ProxyComponent className={props.className}>{props.children}</ProxyComponent>;
};

const StyledCopy: StyledComponentClass<CopyProps, {}> = styled(CopyProxy)`
	margin: 0;
	font-family: ${Fonts.NormalFont};
	color: ${(props: CopyProps) => props.color || 'inherit'};

	${(props: CopyProps) => {
		switch (props.size) {
			case CopySize.Small:
				return css`
					font-size: 14px;
					line-height: 18px;
				`;
			case CopySize.Medium:
			default:
				return css`
					font-size: 24px;
					line-height: 36px;
				`;
		}
	}};

	${(props: CopyProps) => {
		switch (props.textAlign) {
			case CopyTextAlign.Center:
				return css`
					text-align: center;
				`;
			case CopyTextAlign.Right:
				return css`
					text-align: right;
				`;
			case CopyTextAlign.Left:
				return css`
					text-align: left;
				`;
			default:
				return css`
					text-align: inherit;
				`;
		}
	}};

	${(props: CopyProps) =>
		props.uppercase
			? `letter-spacing: 1px;
				text-transform: uppercase;`
			: ''};
`;

export const Copy: React.StatelessComponent<CopyProps> = (props): JSX.Element => {
	const tagName = props.tagName ? props.tagName : 'p';
	const { className, size, textAlign, color, uppercase, children } = props;
	return (
		<StyledCopy
			className={className}
			tagName={tagName}
			size={size}
			textAlign={textAlign}
			color={color}
			uppercase={uppercase}
		>
			{children}
		</StyledCopy>
	);
};
