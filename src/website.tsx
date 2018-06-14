import * as React from 'react';
import * as DesignKit from './components/designkit';

const Website: React.SFC = () => (
	<DesignKit.Layout>
		<DesignKit.Hero
			copyText="Copy: Lorem Ipsum"
			headlineLevel={DesignKit.HeadlineLevel.H1}
			headlineText="Headline: Lorem Ipsum"
		/>
	</DesignKit.Layout>
);

export default Website;
