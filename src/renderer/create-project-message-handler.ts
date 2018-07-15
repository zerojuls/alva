import * as Message from '../message';
import * as Model from '../model';
import { ViewStore } from '../store';
import * as Types from '../types';
import * as uuid from 'uuid';

export type ProjectMessageHandler = (message: Message.Message) => void;

export function createProjectMessageHandler({
	app,
	history,
	store
}: {
	app: Model.AlvaApp;
	history: Model.EditHistory;
	store: ViewStore;
}): void {
	const project = store.getProject();
	const sender = store.getSender();

	if (!project) {
		return;
	}

	sender.match<Message.CreateNewPage>(Message.MessageType.CreateNewPage, () => {
		const page = store.executePageAddNew();

		if (!page) {
			return;
		}

		store.getProject().setActivePage(page);
		page.setNameState(Types.EditableTitleState.Editing);
	});

	sender.match<Message.ConnectPatternLibraryResponse>(
		Message.MessageType.ConnectPatternLibraryResponse,
		message => {
			const analysis = message.payload.analysis;

			const library = Model.PatternLibrary.create({
				id: uuid.v4(),
				name: analysis.name,
				origin: Types.PatternLibraryOrigin.UserProvided,
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

			store.send({
				id: uuid.v4(),
				payload: {
					id: library.getId(),
					path: message.payload.path
				},
				type: Message.MessageType.ConnectedPatternLibraryNotification
			});
		}
	);

	sender.match<Message.UpdatePatternLibraryResponse>(
		Message.MessageType.UpdatePatternLibraryResponse,
		message => {
			const library = project.getPatternLibraryById(message.payload.previousLibraryId);

			if (!library) {
				return;
			}

			library.import(message.payload.analysis, { project });
			store.commit();

			store.send({
				id: uuid.v4(),
				payload: {
					id: library.getId(),
					path: message.payload.path
				},
				type: Message.MessageType.ConnectedPatternLibraryNotification
			});
		}
	);

	sender.match<Message.CheckLibraryResponse>(Message.MessageType.CheckLibraryResponse, message => {
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
	});

	sender.match<Message.SetPane>(Message.MessageType.SetPane, message => {
		app.setPane(message.payload.pane, message.payload.visible);
	});

	sender.match<Message.ChangeUserStore>(Message.MessageType.ChangeUserStore, message => {
		project.getUserStore().sync(message);
	});

	sender.match<Message.SelectElement>(Message.MessageType.SelectElement, message => {
		if (!message.payload.element) {
			return;
		}

		const el = Model.Element.from(message.payload.element, { project });
		const previousEl = project.getElementById(el.getId());

		if (!previousEl) {
			return;
		}

		store.setSelectedElement(previousEl);
	});

	sender.match<Message.HighlightElement>(Message.MessageType.HighlightElement, message => {
		if (!message.payload.element) {
			return;
		}

		const el = Model.Element.from(message.payload.element, { project });
		const previousEl = project.getElementById(el.getId());

		if (!previousEl) {
			return;
		}

		store.setHighlightedElement(previousEl, { flat: !store.getMetaDown() });
	});
}
