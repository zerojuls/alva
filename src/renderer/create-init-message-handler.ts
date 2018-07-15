import * as Message from '../message';
import * as Model from '../model';
import * as Path from 'path';
import { ViewStore } from '../store';
import * as Types from '../types';
import * as uuid from 'uuid';

export interface MessageHandlerContext {
	app: Model.AlvaApp;
	history: Model.EditHistory;
	store: ViewStore;
}

export function createInitMessageHandler({ app, history, store }: MessageHandlerContext): void {
	const sender = store.getSender();

	sender.match<Message.StartAppMessage>(Message.MessageType.StartApp, message => {
		store.setServerPort(Number(message.payload.port));

		try {
			if (message.payload.app) {
				app.update(Model.AlvaApp.from(message.payload.app));
			}
		} catch (err) {
			console.error(err);
			app.setState(Types.AppState.Started);
		} finally {
			console.log(`App started on port ${store.getServerPort()}.`);
			app.setState(Types.AppState.Started);
		}
	});

	sender.match<Message.OpenFileResponse>(Message.MessageType.OpenFileResponse, message => {
		handleOpenFile(message, { app, history, store });
	});

	sender.match<Message.OpenFileResponse>(Message.MessageType.CreateNewFileResponse, message => {
		handleOpenFile(message, { app, history, store });
	});

	sender.match<Message.Log>(Message.MessageType.Log, message => {
		if (Array.isArray(message.payload)) {
			console.log(...message.payload);
		} else {
			console.log(message.payload);
		}
	});

	sender.match<Message.KeyboardChange>(Message.MessageType.KeyboardChange, message => {
		store.setMetaDown(message.payload.metaDown);
	});
}

export enum ProjectCreateStatus {
	Success,
	Error
}

export type ProjectCreateResult = ProjectCreateSuccess | ProjectCreateError;

export interface ProjectCreateSuccess {
	status: ProjectCreateStatus.Success;
	project: Model.Project;
}

export interface ProjectCreateError {
	status: ProjectCreateStatus.Error;
	error: Error;
}

function createProject(data: Types.SerializedProject): ProjectCreateResult {
	try {
		const project = Model.Project.from(data);
		return { project, status: ProjectCreateStatus.Success };
	} catch (error) {
		return { error, status: ProjectCreateStatus.Error };
	}
}

function handleOpenFile(
	message: Message.OpenFileResponse | Message.NewFileResponse,
	{ app, history, store }: MessageHandlerContext
): void {
	if (message.payload.status === Types.ProjectPayloadStatus.Error) {
		return;
	}

	const payload = message.payload as Types.ProjectPayloadSuccess;

	history.clear();

	const projectResult = createProject(payload.contents);

	if (projectResult.status === ProjectCreateStatus.Error) {
		return store.send({
			id: uuid.v4(),
			payload: {
				message: `Sorry, we had trouble reading the project in file "${Path.basename(
					payload.path
				)}".\n Parsing the project failed with: ${projectResult.error.message}`,
				stack: projectResult.error.stack || ''
			},
			type: Message.MessageType.ShowError
		});
	}

	store.setProject(projectResult.project);
	app.setActiveView(Types.AlvaView.PageDetail);
	store.getProject().setFocusedItem(Types.ItemType.Page, store.getActivePage());

	store.commit();
}
