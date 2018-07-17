import * as MobxReact from 'mobx-react';
import { partition } from 'lodash';
import * as Model from '../../model';
import { PropertyListItem } from './property-list-item';
import * as React from 'react';
import * as Types from '../../types';

@MobxReact.inject('app')
@MobxReact.observer
export class PropertyListContainer extends React.Component {
	public render(): React.ReactNode {
		const { store } = this.props as { store: ViewStore };
		const selectedElement = store.getSelectedElement();

		if (!selectedElement) {
			return null;
		}

		const [regularProps, eventHandlerProps] = partition(
			selectedElement.getProperties(),
			isEventHandlerProperty
		);

		return (
			<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
				{regularProps.map(elementProperty => (
					<PropertyListItem key={elementProperty.getId()} property={elementProperty} />
				))}
				{eventHandlerProps.map(elementProperty => (
					<PropertyListItem key={elementProperty.getId()} property={elementProperty} />
				))}
			</div>
		);
	}
}

function isEventHandlerProperty(elementProperty: typeof Model.ElementProperty): boolean {
	const patternProperty = elementProperty.patternProperty;
	return (
		typeof patternProperty !== 'undefined' &&
		patternProperty.getType() !== Types.PatternPropertyType.EventHandler
	);
}
