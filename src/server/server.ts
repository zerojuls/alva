import { createAppRoute } from './create-app-route';
import { createLibrariesRoute } from './create-libraries-route';
import { createPreviewRoute } from './create-preview-route';
import { createScreenshotRoute } from './create-screenshot-route';
import { createScriptsRoute } from './create-scripts-route';
import { createSketchRoute } from './create-sketch-route';
import { createStaticRoute } from './create-static-route';
import * as express from 'express';
import * as Http from 'http';
import { Sender } from '../sender/server';

export interface ServerOptions {
	port: number;
	sender: Sender;
}

export interface AlvaServerInit {
	options: ServerOptions;
	server: Http.Server;
	app: express.Express;
}

export class AlvaServer {
	private options: ServerOptions;
	private app: express.Express;
	private server: Http.Server;

	public constructor(init: AlvaServerInit) {
		this.app = init.app;
		this.options = init.options;
		this.server = init.server;

		this.app.get('/', createAppRoute({ sender: this.options.sender }));

		this.app.get('/preview.html', createPreviewRoute({ sender: this.options.sender }));

		this.app.use('/static', createStaticRoute({ sender: this.options.sender }));

		this.app.use(
			'/sketch',
			createSketchRoute({
				previewLocation: `http://localhost:${this.options.port}/sketch`,
				sender: this.options.sender
			})
		);

		this.app.use(
			'/screenshots',
			createScreenshotRoute({
				previewLocation: `http://localhost:${this.options.port}/static`,
				sender: this.options.sender
			})
		);

		this.app.use('/scripts', createScriptsRoute());
		this.app.use('/libraries', createLibrariesRoute({ sender: this.options.sender }));
	}

	public start(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.server.once('error', reject);
			this.server.listen(this.options.port, 'localhost', () => resolve());
		});
	}

	public stop(): Promise<void> {
		return new Promise(resolve => this.server.close(resolve));
	}
}

export function createServer(options: ServerOptions): AlvaServer {
	const app = express();
	const server = Http.createServer(app);

	return new AlvaServer({
		options,
		app,
		server
	});
}
