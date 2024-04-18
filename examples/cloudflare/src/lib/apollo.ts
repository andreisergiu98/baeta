import { ApolloServer, BaseContext, HeaderMap, HTTPGraphQLRequest } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLSchema } from 'graphql';

interface ApolloOptions<Env, Context> {
  context: (request: Request, env: Env, ctx: ExecutionContext) => Promise<Context>;
}

export function createGraphqlHandler<Env, Context extends BaseContext>(
  schema: GraphQLSchema,
  options: ApolloOptions<Env, Context>
) {
  const apollo = new ApolloServer<Context>({
    schema: schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  });

  apollo.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

  return async (request: Request, env: Env, ctx: ExecutionContext) => {
    try {
      if (request.method === 'OPTIONS') {
        return new Response('', { status: 204 });
      }

      const httpGraphQLRequest = await normalizeIncomingRequest(request);

      const { body, headers, status } = await apollo.executeHTTPGraphQLRequest({
        httpGraphQLRequest: httpGraphQLRequest,
        context: () => options.context(request, env, ctx),
      });

      if (body.kind === 'chunked') {
        throw Error('Incremental delivery not implemented');
      }

      return new Response(body.string, {
        status: status || 200,
        headers: {
          ...Object.fromEntries(headers),
          'content-length': body.string.length.toString(),
        },
      });
    } catch (e) {
      return new Response((e as Error).message, { status: 400 });
    }
  };
}

async function normalizeIncomingRequest(request: Request): Promise<HTTPGraphQLRequest> {
  const headers = normalizeHeaders(request.headers);
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  return {
    method,
    headers,
    body: method === 'GET' ? request.body : await request.json(),
    search: url.search ?? '',
  };
}

function normalizeHeaders(headers: Headers): HeaderMap {
  const headerMap = new HeaderMap();

  headers.forEach((value, key) => {
    headerMap.set(key, Array.isArray(value) ? value.join(', ') : value);
  });

  return headerMap;
}
