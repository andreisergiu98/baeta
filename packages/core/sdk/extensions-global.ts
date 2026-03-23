export {};

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {}

		export interface FieldExtensions<Result, Source, Context, Args, Info> {}

		export interface TypeExtensions<Source, Context, Info> {}

		export interface ModuleExtensions<Context, Info> {}

		export interface SubscriptionExtensions<Result, Source, Context, Args, Info> {}
	}
}
