import type { Steps } from 'github-actions-workflow-builder';
import { github, secrets, type StepContext } from 'github-actions-workflow-builder/lib/context';
import type { ContextValue } from 'github-actions-workflow-builder/lib/ContextValue';
import { actions } from './actions.ts';

export function useBaetaBotToken(): Steps<
	ContextValue<
		StepContext<{
			token: string;
		}>
	>
> {
	return ({ use }) => {
		return use<{ token: string }>('Create GitHub App Token', actions.createGithubAppToken, {
			with: {
				'client-id': secrets.BAETA_BOT_CLIENT_ID,
				'private-key': secrets.BAETA_BOT_PRIVATE_KEY,
				owner: github.repository_owner,
				repositories: github.repository,
			},
			env: {
				LOG_LEVEL: 'debug',
			},
		});
	};
}
