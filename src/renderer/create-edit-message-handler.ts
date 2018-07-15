import * as Message from '../message';
import * as Model from '../model';
import { ViewStore } from '../store';
import * as Types from '../types';

export type EditMessageHandler = (message: Message.Message) => void;

export function createEditMessageHandler({
	app,
	store
}: {
	store: ViewStore;
	app: Model.AlvaApp;
}): void {
	const sender = store.getSender();
	const project = store.getProject();

	sender.match<Message.Undo>(Message.MessageType.Undo, () => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}

		store.undo();
	});

	sender.match<Message.Redo>(Message.MessageType.Redo, () => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		store.redo();
	});

	sender.match<Message.Cut>(Message.MessageType.Cut, () => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		switch (project.getFocusedItemType()) {
			case Types.ItemType.Element:
				store.removeSelectedElement();
				break;
			case Types.ItemType.Page:
				store.removeSelectedPage();
		}
	});

	sender.match<Message.CutPageElement>(Message.MessageType.CutElement, message => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		store.removeElementById(message.payload);
	});

	sender.match<Message.DeletePageElement>(Message.MessageType.DeleteElement, message => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		store.removeElementById(message.payload);
	});

	sender.match<Message.Delete>(Message.MessageType.Delete, message => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		switch (project.getFocusedItemType()) {
			case Types.ItemType.Element:
				store.removeSelectedElement();
				break;
			case Types.ItemType.Page:
				store.removeSelectedPage();
		}
	});

	sender.match<Message.PasteElement>(Message.MessageType.PasteElement, message => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		const activePage = store.getActivePage() as Model.Page;

		if (!activePage) {
			return;
		}

		const targetElement = message.payload.targetId
			? store.getElementById(message.payload.targetId)
			: store.getSelectedElement() || activePage.getRoot();

		if (!targetElement) {
			return;
		}

		const contextProject = Model.Project.from(message.payload.project);
		const sourceElement = Model.Element.from(message.payload.element, {
			project: contextProject
		});
		const clonedElement = sourceElement.clone();

		// TODO: Check if the pattern can be resolved, abort when missing
		project.importElement(clonedElement);

		switch (message.payload.targetType) {
			case Types.ElementTargetType.Inside:
				if (targetElement.acceptsChildren()) {
					store.insertElementInside({
						element: clonedElement,
						targetElement
					});
				}
				break;
			case Types.ElementTargetType.Auto:
			case Types.ElementTargetType.Below:
				store.insertElementAfter({
					element: clonedElement,
					targetElement
				});
		}

		store.commit();
		project.setSelectedElement(clonedElement);
	});

	sender.match<Message.PastePage>(Message.MessageType.PastePage, message => {
		// Do not perform custom operations when an input is selected
		if (document.activeElement.tagName.toLowerCase() === 'input') {
			return;
		}
		const pages = store.getPages();
		const activePage = (store.getActivePage() || pages[pages.length - 1]) as Model.Page;

		const contextProject = Model.Project.from(message.payload.project);
		const sourcePage = Model.Page.from(message.payload.page, { project: contextProject });
		const clonedPage = sourcePage.clone();

		project.importPage(clonedPage);

		store.commit();

		project.movePageAfter({
			page: clonedPage,
			targetPage: activePage
		});

		project.setActivePage(clonedPage);
	});

	sender.match<Message.Duplicate>(Message.MessageType.Duplicate, () => {
		switch (project.getFocusedItemType()) {
			case Types.ItemType.Element:
				store.duplicateSelectedElement();
				break;
			case Types.ItemType.Page:
				store.duplicateActivePage();
		}
	});

	sender.match<Message.DuplicatePageElement>(Message.MessageType.DuplicateElement, message => {
		switch (project.getFocusedItemType()) {
			case Types.ItemType.Element:
				store.duplicateElementById(message.payload);
		}
	});
}
