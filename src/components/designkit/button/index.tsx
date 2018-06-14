import * as React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../colors';
import { Fonts } from '../fonts';

/**
 * @name Button
 */
export interface ButtonProps {
	/** @name Disabled @default false */
	disabled?: boolean;

	/** @name Primary @default true */
	primary?: boolean;

	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;

	children?: React.ReactNode;
}

const StyledButton = styled.button`
	padding: 15px 30px;
	min-width: 200px;
	font-size: 18px;
	font-family: ${Fonts.NormalFont};
	border-radius: 3px;

	${(props: ButtonProps) => {
		if (props.primary) {
			return css`
				background: ${Colors.Blue};
				border: 1px solid ${Colors.GreenDark};
				color: ${Colors.White};
				&:hover {
					background-color: ${Colors.GreenLight};
					border-color: ${Colors.Blue};
				}
				&:disabled {
					border-color: ${Colors.Grey70};
					background-color: ${Colors.Grey70};
				}
			`;
		} else {
			return css`
				background: ${Colors.White};
				border: 1px solid ${Colors.Blue};
				color: ${Colors.Blue};
				&:hover {
					border-color: ${Colors.GreenLight};
					color: ${Colors.GreenLight};
				}
				&:disabled {
					border-color: ${Colors.Grey70};
					color: ${Colors.Grey70};
				}
			`;
		}
	}}} ${(props: ButtonProps) =>
		(props.onClick || props.onMouseDown) && !props.disabled
			? css`
					cursor: pointer;
			  `
			: ''};
`;

export const Button: React.StatelessComponent<ButtonProps> = (props): JSX.Element => (
	<StyledButton {...props}>{props.children}</StyledButton>
);
