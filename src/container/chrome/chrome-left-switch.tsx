import * as Components from '../../components';
import * as MobxReact from 'mobx-react';
import * as React from 'react';
import { ViewStore } from '../../store';

@MobxReact.inject('store')
@MobxReact.observer
export class ChromeLeftSwitch extends React.Component {
	public render(): JSX.Element | null {
		const { store } = this.props as { store: ViewStore };

		return (
			<div
				style={{
					display: 'flex',
					height: '100%',
					marginLeft: Components.getSpace(Components.SpaceSize.XXXL + Components.SpaceSize.XXL)
				}}
			>
				<Components.TabSwitch
					icon={Components.IconName.Page}
					title="Pages"
					type={Components.TabSwitchType.Toggle}
					active={
						store.getShowPages()
							? Components.TabSwitchState.Active
							: Components.TabSwitchState.Default
					}
					onClick={() => store.setShowPages(!store.getShowPages())}
				/>
				<Components.TabSwitch
					icon={Components.IconName.Element}
					title="Elements & Library"
					type={Components.TabSwitchType.Toggle}
					active={
						store.getShowLeftSidebar()
							? Components.TabSwitchState.Active
							: Components.TabSwitchState.Default
					}
					onClick={() => store.setShowLeftSidebar(!store.getShowLeftSidebar())}
				/>
				<Components.TabSwitch
					icon={Components.IconName.Robo}
					title="Properties"
					type={Components.TabSwitchType.Toggle}
					active={
						store.getShowRightSidebar()
							? Components.TabSwitchState.Active
							: Components.TabSwitchState.Default
					}
					onClick={() => store.setShowRightSidebar(!store.getShowRightSidebar())}
				/>
			</div>
		);
	}
}
