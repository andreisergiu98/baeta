interface Migration {
  name: string;
  sql: string;
}

const d1Subscription1: Migration = {
  name: 'subscription-1',
  sql: `
CREATE TABLE Subscriptions (
    id VARCHAR(64) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    connectionId VARCHAR(64) NOT NULL,
    connectionPoolId VARCHAR(64) NOT NULL,
    data JSON NOT NULL
);`,
};

export const d1Migrations: Migration[] = [d1Subscription1];
