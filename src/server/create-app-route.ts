import * as Express from 'express';
import { Sender } from '../sender/server';
import { rendererDocument } from '../renderer/renderer-document';

export interface AppRouteOptions {
	sender: Sender;
}

export function createAppRoute(options: AppRouteOptions): Express.RequestHandler {
	return async function appRoute(req: Express.Request, res: Express.Response): Promise<void> {
		res.type('html');
		res.send(rendererDocument());
	};
}
