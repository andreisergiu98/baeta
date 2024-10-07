export type TypeHash = {
	hash: number;
	fieldsHashes: Record<string, string | undefined>;
};

export type TypeHashMap = Record<string, TypeHash | undefined>;
