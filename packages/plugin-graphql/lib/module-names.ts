const moduleName = /^\p{L}[\p{L}\p{N}_-]*$/u;

export function assertModuleNames(modules: string[]) {
	for (const module of modules) {
		if (!moduleName.test(module)) {
			throw new Error(
				`Module directory ${JSON.stringify(module)} can't be used as a module. Use letters, digits, "-" and "_", starting with a letter.`,
			);
		}
	}
}
