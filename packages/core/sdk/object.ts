import { createObjectTypeMiddleware, ManagerOptions } from ".";

export function createObjectTypeRegisterer<Resolvers, ResolversType>(
  name: string,
  options: ManagerOptions,
  resolversType: ResolversType,
  resolvers: Resolvers
) {
  return {
    ...resolvers,
    $use: createObjectTypeMiddleware<ResolversType>(name, options),
  };
}
