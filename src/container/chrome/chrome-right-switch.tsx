import { TabSwitchState } from '../../components';
import * as MobxReact from 'mobx-react';
import * as React from 'react';
import { TabSwitch, TabSwitchType } from '../../components';
import { ViewStore } from '../../store';
import * as Types from '../../types';

@MobxReact.inject('store')
@MobxReact.observer
export class ChromeRightSwitch extends React.Component {
	public render(): JSX.Element | null {
		const { store } = this.props as { store: ViewStore };

		return (
			<div style={{ display: 'flex', height: '100%', width: '240px' }}>
				<TabSwitch
					label={'Properties'}
					title={'Show Properties'}
					type={TabSwitchType.Tab}
					active={store.getShowRightSidebar() === Types.ShowRightSidebar.Properties ? TabSwitchState.Active : TabSwitchState.Default}
					onClick={() => store.getShowRightSidebar() === Types.ShowRightSidebar.Properties ?  store.setShowRightSidebar(null) : store.setShowRightSidebar(Types.ShowRightSidebar.Properties)}
				/>
				<TabSwitch
					label={'Project Settings'}
					title={'Show Project Settings'}
					type={TabSwitchType.Tab}
					active={store.getShowRightSidebar() === Types.ShowRightSidebar.ProjectSettings ? TabSwitchState.Active : TabSwitchState.Default}
					onClick={() => store.getShowRightSidebar() === Types.ShowRightSidebar.ProjectSettings ?  store.setShowRightSidebar(null) : store.setShowRightSidebar(Types.ShowRightSidebar.ProjectSettings)}
				/>
			</div>
		);
	}
}
