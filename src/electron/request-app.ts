import * as Model from '../model';
import { Sender } from '../sender/server';
import * as Types from '../types';
import * as uuid from 'uuid';

export async function requestApp(sender: Sender): Promise<Model.AlvaApp> {
	const appResponse = await sender.request<Types.AppRequestResponsePair>(
		{
			id: uuid.v4(),
			type: Types.MessageType.AppRequest,
			payload: undefined
		},
		Types.MessageType.AppResponse
	);

	return Model.AlvaApp.from(appResponse.payload.app);
}

export async function requestAppSafely(sender: Sender): Promise<Model.AlvaApp | undefined> {
	try {
		return await requestApp(sender);
	} catch (err) {
		return;
	}
}
