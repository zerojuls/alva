import * as React from 'react';
import styled from 'styled-components';

const StyledFeatureList = styled.div`
	max-width: 1080px;
	margin: 0 auto;
	vertical-align: top;
`;

export const FeatureList: React.SFC = (props): JSX.Element => (
	<StyledFeatureList>{props.children}</StyledFeatureList>
);
