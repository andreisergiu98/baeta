import prompts from 'prompts';

type GetConfirmationOptions = {
	initial?: boolean;
};

export async function getConfirmation(message: string, options: GetConfirmationOptions = {}) {
	const { confirmation } = await prompts({
		name: 'confirmation',
		type: 'confirm',
		message,
		initial: options.initial,
	});
	return confirmation === true;
}
