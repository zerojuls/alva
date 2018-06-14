import * as React from 'react';
import styled from 'styled-components';

export interface SpaceProps {
	/** @name Size @default M */
	size: SpaceSize;
}

export enum SpaceSize {
	XS = '8px',
	S = '16px',
	M = '32px',
	L = '64px',
	XL = '128px'
}

const StyledSpace = styled.div`
	display: block;
	height: ${(props: SpaceProps) => props.size};
	width: ${(props: SpaceProps) => props.size};
`;

export const Space: React.StatelessComponent<SpaceProps> = (props): JSX.Element => (
	<StyledSpace size={props.size} />
);
