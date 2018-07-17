import * as Mst from 'mobx-state-tree';
import * as Types from '../types';

export const PatternSlot = Mst.types.model('PatternSlot', {
	contextId: Mst.types.string,
	displayName: Mst.types.string,
	description: Mst.types.optional(Mst.types.string, ''),
	example: Mst.types.optional(Mst.types.string, ''),
	hidden: Mst.types.optional(Mst.types.boolean, false),
	id: Mst.types.identifier,
	propertyName: Mst.types.string,
	required: Mst.types.optional(Mst.types.boolean, false),
	type: Mst.types.enumeration('type', [Types.SlotType.Children, Types.SlotType.Property])
});
/* import * as Types from '../types';

export interface PatternSlotInit {
	contextId: string;
	displayName: string;
	description: string;
	example: string;
	hidden: boolean;
	id: string;
	propertyName: string;
	required: boolean;
	type: Types.SlotType;
}

export class PatternSlot {
	private contextId: string;
	private displayName: string;
	private description: string;
	private example: string;
	private hidden: boolean;
	private id: string;
	private propertyName: string;
	private required: boolean;
	private type: Types.SlotType;

	public constructor(init: PatternSlotInit) {
		this.type = init.type;
		this.id = init.id;
		this.displayName = init.displayName;
		this.description = init.description;
		this.example = init.example;
		this.hidden = init.hidden;
		this.required = init.required;
		this.type = init.type;
		this.propertyName = init.propertyName;
		this.contextId = init.contextId;
	}

	public static from(serialized: Types.SerializedPatternSlot): PatternSlot {
		return new PatternSlot({
			contextId: serialized.contextId,
			description: serialized.description,
			displayName: serialized.label,
			example: serialized.example,
			hidden: serialized.hidden,
			id: serialized.id,
			propertyName: serialized.propertyName,
			required: serialized.required,
			type: toSlotType(serialized.type)
		});
	}

	public getContextId(): string {
		return this.contextId;
	}

	public getHidden(): boolean {
		return this.hidden;
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.displayName;
	}

	public getPropertyName(): string {
		return this.propertyName;
	}

	public getType(): Types.SlotType {
		return this.type;
	}

	public toJSON(): Types.SerializedPatternSlot {
		return {
			contextId: this.contextId,
			description: this.description,
			example: this.example,
			hidden: this.hidden,
			label: this.displayName,
			propertyName: this.propertyName,
			id: this.id,
			required: this.required,
			type: this.type
		};
	}
}

function toSlotType(type: string): Types.SlotType {
	switch (type) {
		case 'property':
			return Types.SlotType.Property;
		case 'children':
		default:
			return Types.SlotType.Children;
	}
} */
