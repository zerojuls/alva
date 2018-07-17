export type MobxChange =
	| MobxAction
	| MobxScheduledReaction
	| MobxReaction
	| MobxCompute
	// tslint:disable-next-line:no-any
	| MobxUpdate<any, any>
	| MobxSplice
	// tslint:disable-next-line:no-any
	| MobxAdd<any>
	// tslint:disable-next-line:no-any
	| MobxDelete<any>
	// tslint:disable-next-line:no-any
	| MobxCreate<any>;

export enum MobxChangeType {
	Action = 'action',
	ScheduledReaction = 'scheduled-reaction',
	Reaction = 'reaction',
	Compute = 'compute',
	Error = 'error',
	Update = 'update',
	Splice = 'splice',
	Add = 'add',
	Delete = 'delete',
	Create = 'create'
}

export interface MobxAction {
	type: MobxChangeType.Action;
	name: string;
	// tslint:disable-next-line:no-any
	object: any;
	// tslint:disable-next-line:no-any
	arguments: any;
}

export interface MobxScheduledReaction {
	type: MobxChangeType.ScheduledReaction;
}

export interface MobxReaction {
	type: MobxChangeType.Reaction;
}

export interface MobxCompute {
	type: MobxChangeType.Compute;
}

export interface MobxSplice {
	type: MobxChangeType.Splice;
}

export interface MobxAdd<T> {
	object: T;
	name: string;
	newValue: T;
	type: MobxChangeType.Add;
}

export interface MobxDelete<T> {
	object: T;
	name: string;
	oldValue: T;
	type: MobxChangeType.Delete;
}

export interface MobxCreate<T> {
	object: T;
	name: string;
	newValue: T;
	type: MobxChangeType.Create;
}

export type MobxUpdate<V, T> = MobxArrayUpdate<T> | MobxMapUpdate<V, T> | MobxObjectUpdate<T>;

export interface MobxArrayUpdate<T> {
	type: MobxChangeType.Update;
	object: T[];
	name: string;
	index: number;
	newValue: T;
	oldValue: T;
}

export interface MobxMapUpdate<V, T> {
	type: MobxChangeType.Update;
	object: Map<V, T>;
	key: string;
	name: string;
	newValue: T;
	oldValue: T;
}

export interface MobxObjectUpdate<T> {
	type: MobxChangeType.Update;
	object: T;
	key: string;
	name: string;
	newValue: T;
	oldValue: T;
}

export enum MobxUpdateDataType {
	Array = 'array',
	Map = 'map',
	Object = 'object'
}
