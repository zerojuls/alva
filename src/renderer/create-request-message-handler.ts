import * as Message from '../message';
import * as Model from '../model';
import { ViewStore } from '../store';
import * as Types from '../types';

export type RequestMessageHandler = (message: Message.Message) => void;

export function createRequestMessageHandler({
	app,
	history,
	store
}: {
	app: Model.AlvaApp;
	history: Model.EditHistory;
	store: ViewStore;
}): void {
	const sender = store.getSender();

	sender.match<Message.ProjectRequest>(Message.MessageType.ProjectRequest, message => {
		const data = store.getProject();

		if (!data) {
			return store.send({
				id: message.id,
				type: Message.MessageType.ProjectResponse,
				payload: {
					data: undefined,
					status: Types.ProjectStatus.None
				}
			});
		}

		return store.send({
			id: message.id,
			type: Message.MessageType.ProjectResponse,
			payload: {
				data: data.toJSON(),
				status: Types.ProjectStatus.Ok
			}
		});
	});

	sender.match<Message.AppRequest>(Message.MessageType.AppRequest, message => {
		store.send({
			id: message.id,
			type: Message.MessageType.AppResponse,
			payload: {
				app: app.toJSON()
			}
		});
	});
}
