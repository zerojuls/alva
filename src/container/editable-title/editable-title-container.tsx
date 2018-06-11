import * as MobxReact from 'mobx-react';
import * as React from 'react';

import { Page } from '../../model';
import { ViewStore } from '../../store';
import * as Types from '../../types';
import { EditableTitle } from '../../components';

export interface EditableTitleContainerProps {
	focused: boolean;
	page: Page;
	value: string;
}

@MobxReact.inject('store')
@MobxReact.observer
export class EditableTitleContainer extends React.Component<EditableTitleContainerProps> {
	protected handleBlur(): void {
		const { store } = this.props as EditableTitleContainerProps & { store: ViewStore };

		if (!this.props.page.getName()) {
			this.props.page.setName(this.props.page.getName({ unedited: true }));
			this.props.page.setNameState(Types.EditState.Editable);
			return;
		}

		const name = this.props.page.getName();
		const editedName = this.props.page.getEditedName();

		this.props.page.setNameState(Types.EditState.Editable);
		this.props.page.setName(this.props.page.getEditedName());

		if (editedName !== name) {
			store.commit();
		}
	}

	protected handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.props.page.setName(e.target.value);
	}
	protected handleClick(e: React.MouseEvent<HTMLElement>): void {
		if (this.props.page.getNameState() === Types.EditState.Editable) {
			const target = e.target as HTMLElement;
			if (target) {
				target.focus();
			}
			if (this.props.focused && target.matches('[data-title]')) {
				this.props.page.setNameState(Types.EditState.Editing);
			}
		}
	}

	protected handleFocus(): void {
		this.props.page.setNameState(Types.EditState.Editing);
	}

	protected handleKeyDown(e: KeyboardEvent): void {
		const { store } = this.props as EditableTitleContainerProps & { store: ViewStore };

		switch (e.key) {
			case 'Escape':
				this.props.page.setNameState(Types.EditState.Editable);
				this.props.page.setName(this.props.page.getName({ unedited: true }));
				return;
			case 'Enter':
				if (this.props.page.getNameState() === Types.EditState.Editing) {
					if (!this.props.page.getName()) {
						this.props.page.setName(this.props.page.getName({ unedited: true }));
						this.props.page.setNameState(Types.EditState.Editable);
						return;
					}

					this.props.page.setNameState(Types.EditState.Editable);
					this.props.page.setName(this.props.page.getEditedName());
					store.commit();
					return;
				}
				if (
					e.target === document.body &&
					this.props.focused &&
					this.props.page.getNameState() === Types.EditState.Editable
				) {
					this.props.page.setNameState(Types.EditState.Editing);
					return;
				}
		}
	}

	public render(): JSX.Element {
		const { props } = this;
		return (
			<EditableTitle
				data-title={true}
				focused={props.focused}
				onBlur={e => this.handleBlur()}
				onChange={e => this.handleChange(e)}
				onClick={e => this.handleClick(e)}
				onFocus={e => this.handleFocus()}
				onKeyDown={e => {
					e.stopPropagation();
					this.handleKeyDown(e.nativeEvent);
				}}
				name={props.page.getName()}
				nameState={props.page.getNameState()}
				value={props.page.getName()}
			/>
		);
	}
}