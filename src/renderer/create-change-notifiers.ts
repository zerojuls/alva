import * as Sender from '../sender/client';
import * as Mobx from 'mobx';
import * as Model from '../model';
import { ViewStore } from '../store';
import * as Types from '../types';
import * as uuid from 'uuid';

export interface NotifierContext {
	app: Model.AlvaApp;
	store: ViewStore;
}

export function createChangeNotifiers({ app, store }: NotifierContext): void {
	const opts = {
		scheduler: window.requestIdleCallback
	};

	Mobx.autorun(() => {
		Sender.send({
			id: uuid.v4(),
			payload: {
				pages: store.getPages().map(p => p.toJSON())
			},
			type: Types.MessageType.ChangePages
		});
	}, opts);

	Mobx.autorun(() => {
		const elements = store.getElements().map(e => e.toJSON());

		Sender.send({
			id: uuid.v4(),
			payload: { elements },
			type: Types.MessageType.ChangeElements
		});
	}, opts);

	Mobx.autorun(() => {
		const elementContents = store.getElementContents().map(e => e.toJSON());

		Sender.send({
			id: uuid.v4(),
			payload: { elementContents },
			type: Types.MessageType.ChangeElementContents
		});
	}, opts);

	Mobx.autorun(() => {
		const elementActions = store.getElementActions().map(e => e.toJSON());

		Sender.send({
			id: uuid.v4(),
			payload: { elementActions },
			type: Types.MessageType.ChangeElementActions
		});
	}, opts);

	Mobx.autorun(() => {
		const metaDown = store.getMetaDown();

		Sender.send({
			id: uuid.v4(),
			payload: {
				metaDown
			},
			type: Types.MessageType.KeyboardChange
		});
	}, opts);

	Mobx.autorun(() => {
		const patternLibraries = store.getPatternLibraries();

		Sender.send({
			id: uuid.v4(),
			payload: {
				patternLibraries: patternLibraries.map(l => l.toJSON())
			},
			type: Types.MessageType.ChangePatternLibraries
		});

		Sender.send({
			id: uuid.v4(),
			payload: {
				libraries: patternLibraries
					.filter(l => l.getOrigin() === Types.Origin.UserProvided)
					.map(l => l.getId())
			},
			type: Types.MessageType.CheckLibraryRequest
		});
	}, opts);

	Mobx.autorun(() => {
		Sender.send({
			id: uuid.v4(),
			payload: {
				app: store.getApp().toJSON()
			},
			type: Types.MessageType.ChangeApp
		});
	}, opts);

	let syncing = false;

	Mobx.autorun(() => {
		const project = store.getProject();

		if (project && !syncing) {
			syncing = true;

			Mobx.spy((change: Types.MobxChange) => {
				const changedClass = deriveChangedClass(change);

				if (changedClass === Types.ChangedClass.Unknown) {
					// console.log(change.object);
					return;
				}

				switch (change.type) {
					case Types.MobxChangeType.Update: {
						Sender.send({
							id: uuid.v4(),
							type: Types.MessageType.MobxUpdate,
							payload: {
								change: {
									type: change.type,
									id: change.object.id,
									// tslint:disable-next-line:no-any
									index: (change as any).index,
									// tslint:disable-next-line:no-any
									key: (change as any).key,
									newValue: change.newValue
								},
								changedClass
							}
						});
						break;
					}
					case Types.MobxChangeType.Add: {
						// console.log(change);
						break;
					}
					case Types.MobxChangeType.Delete: {
						console.log(change);
					}
				}
			});
		}
	});

	// Mobx.autorun(() => {
	// 	const project = store.getProject();
	// 	Sender.send({
	// 		id: uuid.v4(),
	// 		payload: {
	// 			project: project ? project.toJSON() : undefined
	// 		},
	// 		type: Types.MessageType.ChangeProject
	// 	});
	// }, {
	// 	delay: 5000,
	// 	scheduler: window.requestIdleCallback
	// });
}

type DerivableChange =
	| Types.MobxUpdate<string, Model.ChangeableModel>
	| Types.MobxDelete<Model.ChangeableModel>;

function deriveChangedClass(change: DerivableChange): Types.ChangedClass {
	const source = deriveSource(change);

	if (typeof source === 'undefined') {
		return Types.ChangedClass.Unknown;
	}

	if (source instanceof Model.Page) {
		return Types.ChangedClass.Page;
	}

	if (source instanceof Model.Element) {
		return Types.ChangedClass.Element;
	}

	if (source instanceof Model.ElementAction) {
		return Types.ChangedClass.ElementAction;
	}

	if (source instanceof Model.ElementContent) {
		return Types.ChangedClass.ElementContent;
	}

	if (source instanceof Model.ElementProperty) {
		return Types.ChangedClass.ElementProperty;
	}

	if (source instanceof Model.Pattern) {
		return Types.ChangedClass.Pattern;
	}

	if (source instanceof Model.PatternLibrary) {
		return Types.ChangedClass.PatternLibrary;
	}

	if (source instanceof Model.UserStoreProperty) {
		return Types.ChangedClass.UserStoreProperty;
	}

	if (source instanceof Model.UserStoreAction) {
		return Types.ChangedClass.UserStoreAction;
	}

	return Types.ChangedClass.Unknown;
}

function deriveSource(change: Types.MobxChange): Model.ChangeableModel | undefined {
	switch (change.type) {
		case Types.MobxChangeType.Update:
			return change.object;
		case Types.MobxChangeType.Delete:
			return change.oldValue;
	}
}

export interface NotifierContext {
	app: Model.AlvaApp;
	store: ViewStore;
}
