import { Color } from '../colors';
import * as React from 'react';
import { getSpace, SpaceSize } from '../space';
import styled from 'styled-components';

export interface PropertyBoxProps {
	background?: string;
}

const StyledPropertyBox = styled.div`
	box-sizing: border-box;
	padding: ${getSpace(SpaceSize.S)}px ${getSpace(SpaceSize.M)}px ${getSpace(SpaceSize.M)}px;
	background: ${(props: PropertyBoxProps) => (props.background ? props.background : Color.White )};
	border: 1px solid ${Color.Grey90};
	border-radius: 6px;
	width: 100%;
	user-select: none;
	cursor: default;
	margin-bottom: ${getSpace(SpaceSize.S)}px;
`;

export const PropertyBox: React.SFC<PropertyBoxProps> = props => (
	<StyledPropertyBox background={props.background}>
		{props.children}
	</StyledPropertyBox>
);
