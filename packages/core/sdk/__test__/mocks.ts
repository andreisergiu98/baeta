export type MockSource = {
	name: string;
};

export type MockContext = {
	user: {
		name: string;
	};
};

export type MockArgs = {
	userId: string;
};

export type MockInfo = {
	fieldName: string;
};

export type MockResult = string | null;

export function mockInfo(): MockInfo {
	return {
		fieldName: 'name',
	};
}
