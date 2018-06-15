import { Color, Copy, Headline, PropertyBox, PropertyInput, PropertyInputType } from '../components';
import * as React from 'react';

export const ProjectSettingsContainer: React.SFC = props => (
	<div>
		<Headline order={3}>Project Settings</Headline>
		<PropertyBox>
			<Headline order={4}>Custom CSS File</Headline>
			<Copy textColor={Color.Grey50}>This optional CSS file can be used as styling for all components.</Copy>
			<PropertyInput type={PropertyInputType.Text} />
		</PropertyBox>
	</div>
);
