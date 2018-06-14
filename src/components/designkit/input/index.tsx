import * as React from 'react';
import styled from 'styled-components';
import { Copy, CopySize } from '../copy';
import { Colors } from '../colors';

export interface InputProps {
	/** @name Type @default Text */
	type?: Type;

	/** @name Disabled @default false */
	disabled?: boolean;

	/** @name Label Text @default Lorem Ipsum */
	labelText?: string;

	/** @name Name @default Lorem Ipsum */
	name?: string;

	/** @name Value @default Lorem Ipsum */
	value?: string;

	/** @name Error Text @default Error Ipsum */
	errorText?: string;

	/** @name Placeholder @default Lorem Ipsum */
	placeholder?: string;

	onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
}

export enum Type {
	Text = 'text',
	Number = 'number',
	Email = 'email'
}

const StyledLabel = styled.label`
	display: block;
	color: ${Colors.Black};
`;

const StyledLabelText = styled(Copy)`
	padding: 0 3px 9px;
`;

const StyledInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	padding: 12px;
	border: 1px solid ${Colors.Grey70};
	border-radius: 3px;
	font-size: 15px;
	color: ${Colors.Black};

	${(props: InputProps) => (props.errorText ? `border-color: ${Colors.Red};` : '')};

	:focus {
		border-color: ${Colors.BlueLight};
		box-shadow: 0px 0px 2px 0px ${Colors.BlueLight};
		outline: 0;
	}
`;

const StyledError = styled(Copy)`
	padding: 9px 3px 0;
	color: ${Colors.Red};
`;

export const Input: React.StatelessComponent<InputProps> = (props): JSX.Element => {
	const { labelText, type, value, name, placeholder, disabled, errorText, onChange } = props;
	return (
		<StyledLabel>
			{labelText && (
				<StyledLabelText tagName="div" size={CopySize.Small} uppercase>
					{labelText}
				</StyledLabelText>
			)}
			<StyledInput
				type={type}
				value={value}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				errorText={errorText}
				onChange={onChange}
			/>
			{errorText && (
				<StyledError tagName="div" size={CopySize.Small}>
					{errorText}
				</StyledError>
			)}
		</StyledLabel>
	);
};
