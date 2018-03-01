import { Folder } from './utils/folder';
import { Pattern } from '../pattern/pattern';
import { PatternType } from '../pattern/pattern-type';

export abstract class StyleguideAnalyzer<T extends Pattern = Pattern> {
	private readonly id: string;

	public constructor(id: string) {
		this.id = id;
	}

	public getId(): string {
		return this.id;
	}

	/**
	 * Returns the type of a pattern.
	 * @return The type of a pattern.
	 */
	public abstract getPatternType(): PatternType;

	/**
	 * Returns the folder with all patterns.
	 * @param path
	 * @return The folder (including subfolders) with all patterns.
	 */
	public abstract analyze(path: string): Folder<T>;
}
