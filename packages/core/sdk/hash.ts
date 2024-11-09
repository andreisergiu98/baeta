export type TypeHash = {
	hash: string;
	fieldsHashes: Record<string, string | undefined>;
};

export type TypeHashMap = Record<string, TypeHash | undefined>;
