import { execa } from 'execa';

export async function isCommandAvailable(command: string) {
	const result = await execa(command, ['--version'], { reject: false });
	return !result.failed;
}
