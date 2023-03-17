import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { CloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { GraphQLSchema } from 'graphql';
import { Context as HonoContext } from 'hono';
import { Context } from '../types/context';
import { createContext } from './context';

interface ReqState {
  hono: HonoContext;
}

interface ApolloRequest extends Request {
  state: ReqState;
}

function setApolloRequest(ctx: HonoContext) {
  (ctx.req.raw as ApolloRequest).state = {
    hono: ctx,
  };
}

function createApolloContext({ request }: { request: ApolloRequest }) {
  return createContext(request.state.hono);
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
      context: createApolloContext,
    }
  );

  return (ctx: HonoContext) => {
    setApolloRequest(ctx);
    return handleApollo(ctx.req.raw);
  };
}
