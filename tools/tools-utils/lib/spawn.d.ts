export function spawnCli(
	root: string,
	lib: string,
	path: string,
	execPath?: string,
	args?: string[],
): Promise<void>;

export function spawnTS(root: string, path: string, args?: string[]): Promise<void>;
