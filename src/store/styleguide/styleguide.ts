import { Folder } from './utils/folder';
import { Pattern } from '../pattern/pattern';
import { StyleguideAnalyzer } from './styleguide-analyzer';

export class Styleguide {
	/**
	 * Array of analyzers for styleguides
	 */
	private readonly analyzers: StyleguideAnalyzer[];

	/**
	 * The file path of the styleguide.
	 */
	private readonly path: string;

	/**
	 * Key/value pairs of all patterns from this styleguid
	 */
	private patterns: Map<string, Pattern> = new Map();

	/**
	 * Array of folder of this styleguide
	 */
	private folders: Folder<Pattern>[] = [];

	public constructor(path: string, analyzers?: StyleguideAnalyzer[]) {
		this.analyzers = analyzers || [];
		this.path = path;
	}

	/**
	 * Returns the path to the styleguide.
	 * @return The path to the styleguide.
	 */
	public getPath(): string {
		return this.path;
	}

	/**
	 * Returns all analyzers (readonly).
	 * @return An array of analyzers (readonly)
	 */
	public getAnalyzers(): ReadonlyArray<StyleguideAnalyzer> {
		return this.analyzers;
	}

	/**
	 * Returns the patterns of this styleguide (readonly).
	 * @return The patterns of this styleguide.
	 */
	public getPatterns(): ReadonlyMap<string, Pattern> {
		return this.patterns;
	}

	/**
	 * Returns the folders of this styleguide (readonly).
	 * @return An array of folders of this styleguide.
	 */
	public getFolders(): Folder<Pattern>[] {
		return this.folders;
	}

	/**
	 * Load all patterns of this styleguide
	 * @return void.
	 */
	public load(): void {
		this.patterns = new Map();
		this.folders = [];

		this.analyzers.forEach(analyzer => {
			const groupedPatterns = analyzer.analyze(this.path);
			const patterns = groupedPatterns.flatten();

			this.folders.push(groupedPatterns);

			patterns.forEach(pattern => {
				const localId = getStyleguideLocalPatternId(analyzer.getId(), pattern.getId());
				this.patterns.set(localId, pattern);
			});
		});
	}

	/**
	 * Returns a specific pattern of this styleguide.
	 * @param analyzerId The ID of the analyzer which was used for the pattern to find.
	 * @param id The ID of the pattern to find.
	 * @return The found pattern or undefined.
	 */
	public findPattern(analyzerId: string, id: string): Pattern | undefined {
		const localId = getStyleguideLocalPatternId(analyzerId, id);
		return this.patterns.get(localId);
	}
}

/**
 * Returns the uniqe ID of a pattern inside a styleguide.
 * @param analyzerId The ID of the analyzer which was used for the pattern to find.
 * @param pattnerId The ID of the pattern.
 * @return The unique ID of a pattern.
 */
function getStyleguideLocalPatternId(analyzerId: string, patternId: string): string {
	return `${analyzerId}:${patternId}`;
}
