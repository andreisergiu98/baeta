type NodeGlobal = {
	process: {
		env: {
			[key: string]: string | undefined;
		};
	};
};

type DenoGlobal = {
	Deno: {
		env: {
			get(key: string): string | undefined;
		};
	};
};

type EnvGlobal = {
	env: {
		[key: string]: string | undefined;
	};
};

function supportsNodeEnv(global: Record<string, unknown>): global is NodeGlobal {
	return global.process != null;
}

function supportsDenoEnv(global: Record<string, unknown>): global is DenoGlobal {
	return global.Deno != null;
}

function supportsGlobalEnv(global: Record<string, unknown>): global is EnvGlobal {
	return global.env != null;
}

function getEnvFromNode(global: NodeGlobal, key: string) {
	return global.process.env[key];
}

function getEnvFromDeno(global: DenoGlobal, key: string) {
	return global.Deno.env.get(key);
}

function getEnvFromGlobal(global: EnvGlobal, key: string) {
	return global.env[key];
}

export function getEnv(
	key: string,
	global: Record<string, unknown> = globalThis,
): string | undefined {
	if (supportsNodeEnv(global)) {
		return getEnvFromNode(global, key);
	}

	if (supportsDenoEnv(global)) {
		return getEnvFromDeno(global, key);
	}

	if (supportsGlobalEnv(global)) {
		return getEnvFromGlobal(global, key);
	}

	return undefined;
}

export function isDevelopmentMode(global: Record<string, unknown> = globalThis): boolean {
	const modeKeys = ['BAETA_ENV', 'NODE_ENV', 'ENVIRONMENT'];
	const modeValues = modeKeys.map((key) => getEnv(key, global));

	if (modeValues.includes('production')) {
		return false;
	}

	if (modeValues.includes('development')) {
		return true;
	}

	return false;
}
