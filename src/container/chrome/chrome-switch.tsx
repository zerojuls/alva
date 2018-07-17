import * as MobxReact from 'mobx-react';
import * as React from 'react';
import { getSpace, SpaceSize, LayoutSwitch } from '../../components';
import * as Types from '../../types';

@MobxReact.inject('app')
@MobxReact.observer
export class ChromeSwitch extends React.Component {
	public render(): JSX.Element | null {
		const { store } = this.props as { store: ViewStore };
		const app = store.getApp();
		const next =
			app.getPanes().size > 0
				? []
				: [Types.AppPane.PagesPane, Types.AppPane.ElementsPane, Types.AppPane.PropertiesPane];

		return (
			<div style={{ marginLeft: getSpace(SpaceSize.XXL * 2) }}>
				<LayoutSwitch
					active={!next}
					onPrimaryClick={() => app.setPanes(next)}
					onSecondaryClick={() =>
						store.requestContextMenu({
							menu: Types.ContextMenuType.LayoutMenu,
							data: {
								app: app.toJSON()
							}
						})
					}
				/>
			</div>
		);
	}
}
