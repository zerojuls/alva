// import * as Model from '../model';

// tslint:disable-next-line:no-any
export function getComponents(project: any): { [id: string]: any } {
	return project.patternLibraries.reduce((components, library) => {
		const libraryComponents = window[library.getBundleId()];

		if (!libraryComponents) {
			return components;
		}

		// tslint:disable-next-line:prefer-object-spread
		return Object.assign(components, libraryComponents);
	}, {});
}
