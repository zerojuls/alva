import * as Types from './types';

export function deserializeOrigin(input: Types.SerializedOrigin): Types.Origin {
	switch (input) {
		case 'built-in':
			return Types.Origin.BuiltIn;
		case 'user-provided':
			return Types.Origin.UserProvided;
	}
}

export function serializeOrigin(input: Types.Origin): Types.SerializedOrigin {
	switch (input) {
		case Types.Origin.BuiltIn:
			return 'built-in';
		case Types.Origin.UserProvided:
			return 'user-provided';
	}
}
