export type GeneratorStep = 'setup' | 'generate' | 'end';

export type PluginStepState =
	| {
			status: 'pending';
	  }
	| {
			status: 'started';
			startedAt: number;
	  }
	| {
			status: 'finished';
			startedAt: number;
			finishedAt: number;
	  };

export type PluginState = {
	[step in GeneratorStep]: PluginStepState;
};
