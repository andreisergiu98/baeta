const separator = '$';

export function createConnectionId(connectionPoolId: string): string {
	return `${connectionPoolId}${separator}${crypto.randomUUID()}`;
}

export function getConnectionPoolId(connectionId: string): string {
	return connectionId.split(separator)[0];
}
