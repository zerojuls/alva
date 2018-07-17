import * as Electron from 'electron';
import { isMessage } from './is-message';
import * as Types from '../types';
import * as uuid from 'uuid';

export const senderId = uuid.v4();

export function send(message: Types.Message): void {
	if (!isMessage(message)) {
		console.warn(`Client tried to send invalid message: ${JSON.stringify(message)}`);
		return;
	}
	Electron.ipcRenderer.emit('message', undefined, message);
	Electron.ipcRenderer.send('message', message);
}

export function receive(handler: (message: Types.Message) => void): void {
	Electron.ipcRenderer.on('message', (e: Electron.Event, message) => {
		if (!isMessage(message)) {
			return;
		}
		handler(message);
	});
}
