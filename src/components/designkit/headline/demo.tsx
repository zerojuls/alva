import * as React from 'react';
import { Headline, HeadlineLevel, HeadlineTextAlign } from '.';

const HeadlineDemo: React.StatelessComponent<void> = (): JSX.Element => (
	<div>
		<Headline level={HeadlineLevel.H1}>Headline Order 1</Headline>
		<Headline level={HeadlineLevel.H2}>Headline Order 2</Headline>
		<Headline level={HeadlineLevel.H3}>Headline Order 3</Headline>
		<Headline level={HeadlineLevel.H1} uppercase>
			Headline Order 1
		</Headline>
		<Headline level={HeadlineLevel.H3} textAlign={HeadlineTextAlign.Center}>
			Headline Order 3
		</Headline>
	</div>
);

export default HeadlineDemo;
