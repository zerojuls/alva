import * as Mst from 'mobx-state-tree';
import { Page } from './page';
import { PatternLibrary } from './pattern-library';
import * as Types from '../types';
import { UserStore } from './user-store';

export const Project = Mst.types.model('Project', {
	id: Mst.types.identifier,
	name: Mst.types.string,
	pages: Mst.types.array(Page),
	path: Mst.types.string,
	patternLibraries: Mst.types.array(PatternLibrary),
	focusedItemType: Mst.types.enumeration('ItemType', [
		Types.ItemType.Element,
		Types.ItemType.Page,
		Types.ItemType.None
	]),
	userStore: UserStore
});
