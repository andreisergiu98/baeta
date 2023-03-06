import { Context } from 'hono';

type FetchHandler = (ctx: Context) => Response | Promise<Response>;

export function splitWS(handleWs: FetchHandler, handleGraphql: FetchHandler) {
  return (ctx: Context) => {
    const upgradeHeader = ctx.req.headers.get('upgrade');

    if (upgradeHeader === 'websocket') {
      return handleWs(ctx);
    }

    return handleGraphql(ctx);
  };
}
