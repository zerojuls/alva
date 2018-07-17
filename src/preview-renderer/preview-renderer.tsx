import * as MobxReact from 'mobx-react';
// import { PreviewStore, SyntheticComponents } from '../preview/preview-store';
import { PreviewApplication } from './preview-application';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { SyntheticBox } from './synthetic-box';
import { SyntheticImage } from './synthetic-image';
import { SyntheticLink } from './synthetic-link';
import { SyntheticPage } from './synthetic-page';
import { SyntheticText } from './synthetic-text';

export interface Injection {
	// tslint:disable-next-line:no-any
	store: any; // PreviewStore<React.SFC>;
}

// tslint:disable-next-line:no-any
export function render(store: any /*PreviewStore<React.SFC>*/, container: HTMLElement): void {
	ReactDom.render(
		<MobxReact.Provider store={store}>
			<PreviewApplication />
		</MobxReact.Provider>,
		container
	);
}

// tslint:disable-next-line:no-any
export function getSynthetics(): any /* SyntheticComponents<React.SFC> */ {
	return {
		'synthetic:box': SyntheticBox,
		'synthetic:image': SyntheticImage,
		'synthetic:link': SyntheticLink,
		'synthetic:page': SyntheticPage,
		'synthetic:text': SyntheticText
	};
}
