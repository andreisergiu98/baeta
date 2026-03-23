import { doBatched } from '@baeta/cache/sdk';

export type StorageItem<T = unknown> = {
	value: T;
	expiresAt: number;
};

export const LIMITS = {
	read: 1000,
	write: 128,
	delete: 128,
} as const;

export function createStorageApi<T>() {
	return {
		async get(
			storage: DurableObjectStorage | DurableObjectTransaction,
			keys: string[],
			options?: DurableObjectGetOptions,
		): Promise<Array<T | null>> {
			const items: Array<T | null> = [];
			await doBatched(keys, LIMITS.read, async (batch) => {
				const map = await storage.get<StorageItem<T>>(batch, options);
				const now = Date.now();
				for (const key of batch) {
					const item = map.get(key);
					if (item == null || item.expiresAt <= now) {
						items.push(null);
					} else {
						items.push(item.value);
					}
				}
			});
			return items;
		},
		async put(
			storage: DurableObjectStorage | DurableObjectTransaction,
			entries: Array<[string, T]>,
			expiresAt: number,
			options?: DurableObjectPutOptions,
		) {
			await doBatched(entries, LIMITS.write, async (batch) => {
				const obj: Record<string, StorageItem<T>> = {};
				for (const [key, value] of batch) {
					obj[key] = { value, expiresAt };
				}
				await storage.put(obj, options);
			});
		},
		async delete(
			storage: DurableObjectStorage | DurableObjectTransaction,
			keys: string[],
			options?: DurableObjectPutOptions,
		) {
			let counter = 0;
			await doBatched(keys, LIMITS.delete, async (batch) => {
				counter += await storage.delete(batch, options);
			});
			return counter;
		},
	};
}
