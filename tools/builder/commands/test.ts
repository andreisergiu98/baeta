import { glob, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import c8 from 'c8';
import { execa } from 'execa';
import symbols from 'log-symbols';
import type { CommandModule } from 'yargs';
import z from 'zod';

declare module 'c8' {
	interface CoverageSummary {
		lines: { pct: number };
		functions: { pct: number };
		branches: { pct: number };
		statements: { pct: number };
	}
	interface Report {
		getCoverageMapFromAllCoverageFiles(): Promise<{ getCoverageSummary(): CoverageSummary }>;
	}
}

interface TestArgs {
	'skip-coverage': boolean;
	config: string;
}

const metrics = ['lines', 'functions', 'branches', 'statements'] as const;

export const testCommand: CommandModule<{}, TestArgs> = {
	command: 'test',
	describe: 'Run tests with coverage for package',
	builder: (yargs) => {
		return yargs
			.option('skip-coverage', {
				describe: 'Skip coverage check',
				type: 'boolean',
				default: false,
			})
			.option('config', {
				describe: 'The configuration file to use',
				type: 'string',
				default: join(new URL(import.meta.url).pathname, '../../../../.nycrc.json'),
			});
	},
	handler: async (args) => {
		const files: string[] = [];
		for await (const file of glob('**/*.test.ts')) {
			files.push(file);
		}
		if (files.length === 0) {
			console.log(`${symbols.info} No tests found. Skipping!`);
			return;
		}

		const config = nycrcSchema.parse(JSON.parse(await readFile(args.config, 'utf8')));
		const tempDirectory = await mkdtemp(join(tmpdir(), 'baeta-c8-'));

		try {
			await execa('yarn', ['ava', '--timeout=60s'], {
				stdio: 'inherit',
				env: { ...process.env, NODE_V8_COVERAGE: tempDirectory },
			});

			const report = new c8.Report({
				tempDirectory,
				reporter: config.reporter ?? ['text'],
				reportsDirectory: config['reports-dir'] ?? './coverage',
				reporterOptions: {},
				include: config.include,
				exclude: config.exclude,
			});
			await report.run();

			if (!args.skipCoverage) {
				const summary = (await report.getCoverageMapFromAllCoverageFiles()).getCoverageSummary();
				for (const metric of metrics) {
					const threshold = config[metric];
					if (threshold == null) {
						continue;
					}
					const pct = summary[metric].pct;
					if (pct < threshold) {
						process.exitCode = 1;
						console.error(
							`${symbols.error} Coverage for ${metric} (${pct}%) does not meet global threshold (${threshold}%)`,
						);
					}
				}
			}
		} catch (error) {
			process.exitCode = (error as { exitCode?: number }).exitCode ?? 1;
		} finally {
			await rm(tempDirectory, { recursive: true, force: true });
		}
	},
};

const nycrcSchema = z.object({
	reporter: z.array(z.string()).optional(),
	lines: z.number(),
	statements: z.number(),
	branches: z.number(),
	functions: z.number().optional(),
	include: z.array(z.string()).optional(),
	exclude: z.array(z.string()).optional(),
	'reports-dir': z.string().optional(),
});
