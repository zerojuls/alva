import * as Model from '../model';
import * as Sender from '../sender/client';
import { ViewStore } from '../store';
import * as Types from '../types';
import * as uuid from 'uuid';

export type ProjectMessageHandler = (message: Types.Message) => void;

export function createProjectMessageHandler({
	app,
	history,
	store
}: {
	app: Model.AlvaApp;
	history: Model.EditHistory;
	store: ViewStore;
}): ProjectMessageHandler {
	// tslint:disable-next-line:cyclomatic-complexity
	return async function projectMessagehandler(message: Types.Message): Promise<void> {
		const project = store.getProject();

		if (!project) {
			return;
		}

		switch (message.type) {
			case Types.MessageType.CreateNewPage: {
				const page = store.executePageAddNew();

				if (!page) {
					return;
				}

				store.getProject().setActivePage(page);
				page.setNameState(Types.EditableTitleState.Editing);

				break;
			}
			case Types.MessageType.ConnectPatternLibraryResponse: {
				const analysis = message.payload.analysis;

				const library = Model.PatternLibrary.create({
					id: uuid.v4(),
					name: analysis.name,
					origin: Types.Origin.UserProvided,
					patternProperties: [],
					patterns: [],
					bundle: analysis.bundle,
					bundleId: analysis.id,
					description: analysis.description,
					state: Types.PatternLibraryState.Connected
				});

				library.import(analysis, { project });

				project.addPatternLibrary(library);
				store.getApp().setRightSidebarTab(Types.RightSidebarTab.ProjectSettings);
				store.commit();

				Sender.send({
					id: uuid.v4(),
					payload: {
						id: library.getId(),
						path: message.payload.path
					},
					type: Types.MessageType.ConnectedPatternLibraryNotification
				});

				break;
			}
			case Types.MessageType.UpdatePatternLibraryResponse: {
				const library = project.getPatternLibraryById(message.payload.previousLibraryId);

				if (!library) {
					return;
				}

				library.import(message.payload.analysis, { project });
				store.commit();

				Sender.send({
					id: uuid.v4(),
					payload: {
						id: library.getId(),
						path: message.payload.path
					},
					type: Types.MessageType.ConnectedPatternLibraryNotification
				});

				break;
			}
			case Types.MessageType.CheckLibraryResponse: {
				message.payload
					.map(check => ({ library: project.getPatternLibraryById(check.id), check }))
					.forEach(({ library, check }) => {
						if (typeof library === 'undefined') {
							return;
						}
						library.setState(
							check.connected
								? Types.PatternLibraryState.Connected
								: Types.PatternLibraryState.Disconnected
						);
					});
				break;
			}
			case Types.MessageType.SetPane: {
				app.setPane(message.payload.pane, message.payload.visible);
				break;
			}
			case Types.MessageType.ChangeUserStore: {
				project.getUserStore().sync(message);
				break;
			}
			case Types.MessageType.SelectElement: {
				if (!message.payload.element) {
					return;
				}

				const el = Model.Element.from(message.payload.element, { project });
				const previousEl = project.getElementById(el.getId());

				if (!previousEl) {
					return;
				}

				store.setSelectedElement(previousEl);
				break;
			}
			case Types.MessageType.HighlightElement: {
				if (!message.payload.element) {
					return;
				}

				const el = Model.Element.from(message.payload.element, { project });
				const previousEl = project.getElementById(el.getId());

				if (!previousEl) {
					return;
				}

				store.setHighlightedElement(previousEl, { flat: !store.getMetaDown() });
			}
		}
	};
}
