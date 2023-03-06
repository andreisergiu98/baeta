import { createApplication } from '@baeta/core';
import { Hono } from 'hono';
import { createGraphqlHandler } from './lib/apollo';
import { splitWS } from './lib/apollo-ws';
import { createGraphqlWSHandler } from './lib/ws';
import { userModule } from './modules/user';

const baeta = createApplication({
  modules: [userModule],
});

const handleGraphql = createGraphqlHandler(baeta.schema);
const handleGraphqlWs = createGraphqlWSHandler(baeta.schema);

const router = new Hono();

router.get('/', handleGraphql);

router.get('/graphql', splitWS(handleGraphqlWs, handleGraphql));

router.post('/graphql', handleGraphql);

export default router;
