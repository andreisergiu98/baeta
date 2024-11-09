interface DurableObjectMigration {
	tag: string;
	content: string[];
}

const wsConnectionCreateMigration: DurableObjectMigration = {
	tag: 'baeta-subs-v1',
	content: ['new_classes = ["BaetaWsConnections"]'],
};

export const durableObjectsMigrations: DurableObjectMigration[] = [wsConnectionCreateMigration];
