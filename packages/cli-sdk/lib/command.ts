import type { CliContext } from './cli-context.ts';

interface CliOptionValues {
	string: string;
	boolean: boolean;
}

export interface CliOption {
	type: keyof CliOptionValues;
	/**
	 * Single-character flag, e.g. `w` for `-w`.
	 */
	short?: string;
	describe?: string;
}

export interface CliPositional {
	describe?: string;
}

type CliPositionals = Record<string, CliPositional>;
type CliOptions = Record<string, CliOption>;

type CliArgs<P extends CliPositionals, O extends CliOptions> = {
	[K in keyof P]: string;
} & {
	[K in keyof O]?: CliOptionValues[O[K]['type']];
};

interface CliCommandDefinition<P extends CliPositionals, O extends CliOptions> {
	name: string;
	aliases?: string[];
	describe: string;
	/**
	 * Required positionals, in order.
	 */
	positionals?: P;
	/**
	 * Keys are camelCase; `dryRun` is passed as `--dry-run`.
	 */
	options?: O;
	handler(args: CliArgs<P, O>, ctx: CliContext): void | Promise<void>;
}

export interface CliCommand extends Omit<
	CliCommandDefinition<CliPositionals, CliOptions>,
	'handler'
> {
	handler(args: Record<string, unknown>, ctx: CliContext): void | Promise<void>;
}

/**
 * Infers the handler's `args` from `positionals` and `options`.
 */
export function createCommand<
	const P extends CliPositionals = Record<never, never>,
	const O extends CliOptions = Record<never, never>,
>(command: CliCommandDefinition<P, O>): CliCommand {
	return command;
}
