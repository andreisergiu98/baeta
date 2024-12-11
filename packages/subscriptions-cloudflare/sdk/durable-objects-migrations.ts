const wsConnectionCreateMigration = {
	tag: 'baeta-subs-v1',
	content: ['new_classes = ["BaetaWsConnections"]'],
};

export const durableObjectsMigrations = [wsConnectionCreateMigration];
