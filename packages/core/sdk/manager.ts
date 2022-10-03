import { OnDirective } from './directive';
import { OnMiddleware } from './middleware';
import { OnResolver } from './resolver';
import { OnScalarResolver } from './scalar';
import { OnSubscription } from './subscription';

export interface ManagerOptions {
  onScalar: OnScalarResolver;
  onResolver: OnResolver;
  onMiddleware: OnMiddleware;
  onSubscription: OnSubscription;
  onDirective: OnDirective;
}

export function createManager<Map, Resolvers>(
  options: ManagerOptions,
  resolversType: Resolvers,
  map: Map
) {
  return { ...map, $directive: options.onDirective };
}
