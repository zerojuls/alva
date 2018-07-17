import * as Express from 'express';
import * as Fs from 'fs';
import * as Path from 'path';

export function createScriptsRoute(): Express.RequestHandler {
	return function scriptsRoute(req: Express.Request, res: Express.Response): void {
		res.type('js');

		Fs.createReadStream(Path.join(__dirname, '..', 'scripts', req.path.slice(1)))
			.once('error', () => res.sendStatus(404))
			.pipe(res);
	};
}
