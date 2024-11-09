interface DurableObjectMigration {
	tag: string;
	content: string[];
}

const baetaCacheMigration: DurableObjectMigration = {
	tag: 'baeta-cache-v1',
	content: ['new_classes = ["BaetaCache"]'],
};

export const durableObjectsMigrations: DurableObjectMigration[] = [baetaCacheMigration];
