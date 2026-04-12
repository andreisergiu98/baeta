export {};

declare global {
	export namespace BaetaExtensions {
		export interface Extensions {}

		export interface FieldExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			ModuleName extends string,
			TypeName extends string,
			FieldName extends string,
		> {}

		export interface TypeExtensions<
			Source,
			Context,
			Info,
			ModuleName extends string,
			TypeName extends string,
		> {}

		export interface ModuleExtensions<Context, Info, ModuleName extends string> {}

		export interface SubscriptionExtensions<
			Result,
			Source,
			Context,
			Args,
			Info,
			ModuleName extends string,
			FieldName extends string,
		> {}
	}
}
