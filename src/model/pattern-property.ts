import * as Mst from 'mobx-state-tree';
import * as Types from '../types';

export const PatternProperty = Mst.types.model('Pattern', {
	contextId: Mst.types.string,
	defaultValue: Mst.types.optional(Mst.types.string, ''),
	description: Mst.types.optional(Mst.types.string, ''),
	example: Mst.types.optional(Mst.types.string, ''),
	hidden: Mst.types.optional(Mst.types.boolean, false),
	id: Mst.types.identifier,
	label: Mst.types.string,
	name: Mst.types.string,
	origin: Mst.types.enumeration('origin', [
		Types.PatternPropertyOrigin.BuiltIn,
		Types.PatternPropertyOrigin.UserProvided
	]),
	required: Mst.types.optional(Mst.types.boolean, false)
});
