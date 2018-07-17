import * as WS from 'ws';
import * as Serde from '../sender/serde';
import * as Types from '../types';

export type ServerMessageHandler = (message: Types.Message) => void;

export interface ServerMessageHandlerContext {
	webSocketServer: WS.Server;
}

export function createServerMessageHandler(
	context: ServerMessageHandlerContext
): ServerMessageHandler {
	return function serverMessageHandler(message: Types.Message): void {
		context.webSocketServer.clients.forEach(client => {
			if (client.readyState === WS.OPEN) {
				client.send(Serde.serialize(message));
			}
		});
	};
}
