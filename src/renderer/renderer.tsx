import { App } from '../container/app';
// import { createChangeNotifiers } from './create-change-notifiers';
// import { createServerMessageHandler } from './create-server-message-handler';
// import * as Sender from '../sender/client';
// import { MessageType } from '../message';
import * as MobxReact from 'mobx-react';
// import * as Model from '../model';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { registerGlobalListeners } from './register-global-listeners';
// import * as uuid from 'uuid';

export function startRenderer(): void {
	console.log('App starting...');

	// Sender.send({
	// 	id: uuid.v4(),
	// 	type: MessageType.AppLoaded,
	// 	payload: undefined
	// });

	// const app = Model.AlvaApp.create();
	// const history = new Model.EditHistory();
	// const store = new ViewStore({ app, history });
	// Sender.receive(createServerMessageHandler({ app }));
	// createChangeNotifiers({ app });

	const app = Model.AlvaApp.create();

	ReactDom.render(
		<MobxReact.Provider>
			<App />
		</MobxReact.Provider>,
		document.getElementById('app')
	);

	registerGlobalListeners();
}
