import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../colors';
import { Fonts } from '../fonts';

export interface DropdownItemProps {
	/** @name Content text @default Dropdown Item */
	content: string;
}

const StyledDropdownItem = styled.div`
	display: flex;
	padding: 17px 22px;
	border-top: 1px solid ${Colors.Grey70};
	font-family: ${Fonts.NormalFont};

	&:hover {
		color: ${Colors.Black};
	}
`;

export const DropdownItem: React.StatelessComponent<DropdownItemProps> = props => (
	<StyledDropdownItem>{props.content}</StyledDropdownItem>
);
