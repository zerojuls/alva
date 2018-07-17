import { BrowserWindow, ipcMain } from 'electron';
import { isMessage } from './is-message';
import * as uuid from 'uuid';
import * as Types from '../types';

export type ServerHandler = (message: Types.Message) => void;

// tslint:disable-next-line:no-any
export type IpcHandler = (e: any, message: any) => void;

export class Sender {
	private received: Map<Types.MessageType, Types.Message> = new Map();
	private sendHandlers: ServerHandler[] = [];

	// tslint:disable-next-line:no-any
	private receiveIpcHandlers: IpcHandler[] = [];

	public async receive(handler: (message: Types.Message) => void): Promise<void> {
		// tslint:disable-next-line:no-any
		const receiveHandler = (e: any, message: any) => {
			if (!isMessage(message)) {
				return;
			}
			this.received.set(message.type, message);
			handler(message);
		};

		ipcMain.on('message', receiveHandler);
		this.receiveIpcHandlers.push(receiveHandler);
	}

	public request<T extends Types.RequestResponsePair>(
		message: T['request'],
		responseType: T['response']['type']
	): Promise<T['response']> {
		return new Promise((resolve, reject) => {
			// tslint:disable-next-line:no-any
			function messageHandler(e: any, responseMessage: any): void {
				if (!isMessage(message)) {
					return;
				}

				if (responseMessage.id !== message.id) {
					return;
				}

				if (responseType !== responseMessage.type) {
					return;
				}

				ipcMain.removeListener('message', messageHandler);
				resolve(responseMessage);
			}

			ipcMain.on('message', messageHandler);
			this.send(message);
		});
	}

	public async send(message: Types.Message): Promise<void> {
		if (!isMessage(message)) {
			console.warn(`Server tried to send invalid message: ${JSON.stringify(message)}`);
			return;
		}

		this.sendHandlers.forEach(handler => handler(message));
		ipcMain.emit('message', undefined, message);
		BrowserWindow.getAllWindows().forEach(win => win.webContents.send('message', message));
	}

	public stop(): void {
		this.received.clear();
		this.sendHandlers = [];
		this.receiveIpcHandlers.forEach(receiveIpcHandler => {
			ipcMain.removeListener('message', receiveIpcHandler);
		});
	}

	public use(handler: ServerHandler): void {
		this.sendHandlers.push(handler);
	}

	public last<T extends Types.Message>(type: T['type']): T | undefined {
		return this.received.get(type) as T;
	}

	// tslint:disable-next-line:no-any
	public async log(...args: any[]): Promise<void> {
		this.send({
			type: Types.MessageType.Log,
			id: uuid.v4(),
			payload: args
		});
	}
}
