import * as Types from '../types';

const TYPES = Object.values(Types.MessageType);

// tslint:disable-next-line:no-any
export function isMessage(input: any): input is Types.Message {
	if (typeof input !== 'object') {
		return false;
	}

	const type = input.type;

	if (typeof type !== 'string' || typeof input.id !== 'string') {
		return false;
	}

	if (!TYPES.includes(type)) {
		return false;
	}

	return true;
}
