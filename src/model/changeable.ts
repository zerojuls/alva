import * as Model from '.';

export type ChangeableModel =
	| Model.Page
	| Model.Project
	| Model.Element
	| Model.ElementAction
	| Model.ElementContent
	| Model.ElementProperty
	| Model.Pattern
	| Model.PatternLibrary;
