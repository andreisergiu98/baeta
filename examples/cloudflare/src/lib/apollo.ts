import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { CloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { GraphQLSchema } from 'graphql';
import { Context as HonoContext } from 'hono';
import { Context } from '../types/context';
import { createPubSubWrapper } from './pubsub';

interface ReqState {
  executionCtx: ExecutionContext;
}

function setApolloRequest(ctx: HonoContext) {
  (ctx.req.raw as ApolloRequest).state = {
    executionCtx: ctx.executionCtx,
  };
}

interface ApolloRequest extends Request {
  state: ReqState;
}

export function createGraphqlHandler(schema: GraphQLSchema) {
  const apollo = new ApolloServer<Context>({
    schema: schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  });

  const handleApollo: CloudflareWorkersHandler = startServerAndCreateCloudflareWorkersHandler(
    apollo,
    {
      context: async ({ request }: { request: ApolloRequest }): Promise<Context> => {
        return {
          executionCtx: request.state.executionCtx,
          pubsub: createPubSubWrapper(request.state.executionCtx),
        };
      },
    }
  );

  return (ctx: HonoContext) => {
    setApolloRequest(ctx);
    return handleApollo(ctx.req.raw);
  };
}
