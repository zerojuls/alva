import * as React from 'react';
import { HeadlineLevel } from '../headline';
import { Teaser } from '.';

export default (): JSX.Element => (
	<Teaser
		headlineText="Start your designs with Stacked"
		headlineLevel={HeadlineLevel.H1}
		copyText="Stacked is a radical tool to create systematic designs in a cross-functional team. The core are reusable components build with real web technologies, fully responsive to match any device."
		buttonLabel="Get started now"
	/>
);
