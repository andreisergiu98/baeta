import type { Steps } from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/lib/context';
import type { ContextValue } from 'github-actions-workflow-builder/lib/ContextValue';
import { useGithubAppToken } from './actions.ts';

export function useBaetaBotToken(): Steps<
	ContextValue<{
		token: string;
	}>
> {
	return ({ add }) => {
		return add(
			useGithubAppToken({
				stepName: 'Create Baeta Bot Token',
				clientId: secrets.BAETA_BOT_CLIENT_ID,
				clientSecret: secrets.BAETA_BOT_PRIVATE_KEY,
				owner: github.repository_owner,
				repositories: github.repository,
			}),
		);
	};
}
