import confirm from '@inquirer/confirm';

type GetConfirmationOptions = {
	initial?: boolean;
};

export async function getConfirmation(message: string, options: GetConfirmationOptions = {}) {
	return await confirm({
		message,
		default: options.initial,
	});
}
