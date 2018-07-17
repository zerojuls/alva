import * as Model from '../model';
import * as Sender from '../sender/client';
import { ViewStore } from '../store';
import * as Types from '../types';

export type RequestMessageHandler = (message: Types.Message) => void;

export function createRequestMessageHandler({
	app,
	history,
	store
}: {
	app: Model.AlvaApp;
	history: Model.EditHistory;
	store: ViewStore;
}): RequestMessageHandler {
	return function requestMessageHandler(message: Types.Message): void {
		switch (message.type) {
			case Types.MessageType.ProjectRequest: {
				const data = store.getProject();

				if (!data) {
					return Sender.send({
						id: message.id,
						type: Types.MessageType.ProjectResponse,
						payload: {
							data: undefined,
							status: Types.ProjectStatus.None
						}
					});
				}

				return Sender.send({
					id: message.id,
					type: Types.MessageType.ProjectResponse,
					payload: {
						data: data.toJSON(),
						status: Types.ProjectStatus.Ok
					}
				});
			}
			case Types.MessageType.AppRequest: {
				return Sender.send({
					id: message.id,
					type: Types.MessageType.AppResponse,
					payload: {
						app: app.toJSON()
					}
				});
			}
		}
	};
}
