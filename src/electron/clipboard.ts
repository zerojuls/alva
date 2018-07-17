import * as AlvaUtil from '../alva-util';
import * as Electron from 'electron';
import { isMessage } from '../sender/is-message';
import * as uuid from 'uuid';
import * as Types from '../types';

export function setClipboard(payload: Types.Clipboard['payload']): void {
	Electron.clipboard.writeBuffer(
		'application/alva',
		Buffer.from(
			JSON.stringify({
				type: Types.MessageType.Clipboard,
				id: uuid.v4(),
				payload
			})
		)
	);
}

export function getClipboard(): Types.Clipboard | undefined {
	const rawData = Electron.clipboard.readBuffer('application/alva').toString();

	if (!rawData) {
		return;
	}

	const parseResult = AlvaUtil.parseJSON(rawData);

	if (parseResult.type === AlvaUtil.ParseResultType.Error) {
		console.error(parseResult.error);
		return;
	}

	if (!isMessage(parseResult.result)) {
		console.error(`Received malformed clipboard message: ${parseResult.data}`);
		return;
	}

	if (parseResult.result.type !== Types.MessageType.Clipboard) {
		return;
	}

	return parseResult.result as Types.Clipboard;
}
