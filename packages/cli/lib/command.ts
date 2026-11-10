import { type CliCommand, type CliContext, makeErrorMessage } from '@baeta/cli-sdk';
import { type ArgDef, type CommandDef, defineCommand, type ParsedArgs, showUsage } from 'citty';

class UsageError extends Error {}

export function createCittyCommand(command: CliCommand, ctx: CliContext, parent: CommandDef) {
	const cittyCommand: CommandDef = defineCommand({
		meta: { name: command.name, alias: command.aliases, description: command.describe },
		args: createArgs(command),
		run: async ({ args }) => {
			try {
				checkArgs(command, args);
				await command.handler(args, ctx);
			} catch (error) {
				if (error instanceof UsageError) {
					await showUsage(cittyCommand, parent);
					console.error(error.message);
				} else {
					console.error(makeErrorMessage('Command failed.'), error);
				}
				process.exitCode = 1;
			}
		},
	});
	return cittyCommand;
}

function createArgs(command: CliCommand) {
	const args: Record<string, ArgDef> = {};
	for (const [name, positional] of Object.entries(command.positionals ?? {})) {
		args[name] = { type: 'positional', description: positional.describe };
	}
	for (const [name, option] of Object.entries(command.options ?? {})) {
		args[toFlag(name)] = {
			type: option.type,
			alias: option.short,
			description: option.describe,
		};
	}
	return args;
}

function checkArgs(command: CliCommand, parsed: ParsedArgs) {
	const positionals = Object.keys(command.positionals ?? {});
	const known = new Set([
		'_',
		...positionals,
		...Object.entries(command.options ?? {}).flatMap(([name, option]) => [
			name,
			toFlag(name),
			option.short ?? name,
		]),
	]);

	const unknown = Object.keys(parsed).find((key) => !known.has(key));
	if (unknown) {
		throw new UsageError(`Unknown option: ${unknown.length === 1 ? '-' : '--'}${unknown}`);
	}
	if (parsed._.length > positionals.length) {
		throw new UsageError(`Unexpected argument: ${parsed._[positionals.length]}`);
	}
}

function toFlag(name: string) {
	return name.replaceAll(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
