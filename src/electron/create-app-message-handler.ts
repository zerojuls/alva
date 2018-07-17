import * as Electron from 'electron';
import * as uuid from 'uuid';
import { checkForUpdates } from './auto-updater';
import { showError } from './show-error';
import { requestAppSafely } from './request-app';
import { requestProjectSafely } from './request-project';
import { showContextMenu } from './show-context-menu';
import { showMainMenu } from './show-main-menu';
import * as Types from '../types';

import {
	ServerMessageHandlerContext,
	ServerMessageHandlerInjection
} from './create-server-message-handler';

export async function createAppMessageHandler(
	ctx: ServerMessageHandlerContext,
	injection: ServerMessageHandlerInjection
): Promise<(message: Types.Message) => Promise<void>> {
	return async function appMessageHandler(message: Types.Message): Promise<void> {
		switch (message.type) {
			case Types.MessageType.CheckForUpdatesRequest: {
				if (ctx.win) {
					checkForUpdates(ctx.win, true);
				}
				break;
			}
			case Types.MessageType.AppLoaded: {
				const pathToOpen = await injection.ephemeralStore.getProjectPath();

				if (!pathToOpen) {
					return injection.sender.send({
						id: uuid.v4(),
						type: Types.MessageType.StartApp,
						payload: {
							app: undefined,
							port: ctx.port as number
						}
					});
				}

				const projectResponse = await injection.sender.request<
					Types.OpenFileRequestResponsePair
				>(
					{
						id: uuid.v4(),
						type: Types.MessageType.OpenFileRequest,
						payload: pathToOpen ? { path: pathToOpen, silent: true } : undefined
					},
					Types.MessageType.OpenFileResponse
				);

				if (projectResponse.payload.status === Types.ProjectPayloadStatus.Error) {
					injection.ephemeralStore.clearProjectPath();

					return injection.sender.send({
						id: uuid.v4(),
						type: Types.MessageType.StartApp,
						payload: {
							app: undefined,
							port: ctx.port as number
						}
					});
				}

				return injection.sender.send({
					id: uuid.v4(),
					type: Types.MessageType.StartApp,
					payload: {
						app: await injection.ephemeralStore.getAppState(),
						port: ctx.port as number
					}
				});
			}
			case Types.MessageType.Reload: {
				injection.emitter.emit('reload', message.payload || {});
				break;
			}
			case Types.MessageType.Maximize: {
				if (ctx.win) {
					ctx.win.isMaximized() ? ctx.win.unmaximize() : ctx.win.maximize();
				}
				break;
			}
			case Types.MessageType.ShowError: {
				const error = new Error(message.payload.message);
				error.stack = message.payload.stack;
				showError(error);
				break;
			}
			case Types.MessageType.OpenExternalURL: {
				Electron.shell.openExternal(message.payload);
				break;
			}
			case Types.MessageType.ContextMenuRequest: {
				showContextMenu(message.payload, { sender: injection.sender });
				break;
			}
			case Types.MessageType.ChangeApp: {
				injection.ephemeralStore.setAppState(message.payload.app);
				const project = await requestProjectSafely(injection.sender);

				showMainMenu(
					{ app: message.payload.app, project: project ? project.toJSON() : undefined },
					{ sender: injection.sender }
				);

				break;
			}
			case Types.MessageType.ChangeProject: {
				const app = await requestAppSafely(injection.sender);

				if (!app) {
					return;
				}

				showMainMenu(
					{ app: app.toJSON(), project: message.payload.project },
					{ sender: injection.sender }
				);
			}
		}
	};
}
