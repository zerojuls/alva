import * as React from 'react';
import { HeadlineLevel } from '../headline';
import { Hero } from '.';

export default (): JSX.Element => (
	<Hero
		headlineLevel={HeadlineLevel.H1}
		headlineText="Start your designs with Alva"
		copyText="Alva is a radical tool to create systematic designs in a cross-functional team. The core are reusable components build with real web technologies, fully responsive to match any device."
	/>
);
