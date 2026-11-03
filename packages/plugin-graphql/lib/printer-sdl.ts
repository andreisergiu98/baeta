export function printSdl(sdl: string) {
	return `export default ${JSON.stringify(sdl)};\n`;
}
