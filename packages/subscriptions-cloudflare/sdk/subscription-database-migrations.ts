interface Migration {
	name: string;
	sql: string;
}

const migration0: Migration = {
	name: '0-baeta-subscription-init',
	sql: `
CREATE TABLE Subscriptions (
  id VARCHAR(64) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  connectionId VARCHAR(64) NOT NULL,
  connectionPoolId VARCHAR(64) NOT NULL,
  data TEXT NOT NULL
);
`,
};

export const databaseMigrations: Migration[] = [migration0];
