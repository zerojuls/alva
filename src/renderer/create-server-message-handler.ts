import { createEditMessageHandler } from './create-edit-message-handler';
import { createInitMessageHandler } from './create-init-message-handler';
import { createProjectMessageHandler } from './create-project-message-handler';
import { createRequestMessageHandler } from './create-request-message-handler';
import * as Model from '../model';
import { ViewStore } from '../store';

export interface ServerMessageHandlerContext {
	app: Model.AlvaApp;
	history: Model.EditHistory;
	store: ViewStore;
}

export function createServerMessageHandler({
	app,
	history,
	store
}: ServerMessageHandlerContext): void {
	createInitMessageHandler({ app, history, store });
	createEditMessageHandler({ app, store });
	createProjectMessageHandler({ app, history, store });
	createRequestMessageHandler({ app, history, store });
}
