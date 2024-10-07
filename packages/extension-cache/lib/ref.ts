export type ItemRef = string | number | bigint;
export type ParentRef = ItemRef | null | undefined;

export type RefCompatibleRoot = { id: string | number | bigint } | { [key: string]: never };

export class CacheRef<Result, Root, Args> {
	constructor(
		private type: string,
		private field: string,
	) {}

	toString() {
		return `${this.type}.${this.field}`;
	}
}
