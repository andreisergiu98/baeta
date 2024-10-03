interface DurableObjectMigration {
	tag: string;
	content: string[];
}

const wsConnectionCreateMigration: DurableObjectMigration = {
	tag: 'v1',
	content: ['new_classes = ["BaetaWsConnections"]'],
};

export const durableObjectsMigrations: DurableObjectMigration[] = [wsConnectionCreateMigration];
