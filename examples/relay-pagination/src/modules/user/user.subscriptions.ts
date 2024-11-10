import { db } from '../../lib/db/prisma.ts';
import { getUserModule } from './typedef.ts';

const { Subscription } = getUserModule();

Subscription.userCreated({
	subscribe(params) {
		return params.ctx.pubsub.asyncIterator('user-created');
	},
	resolve(params) {
		return db.user.findFirstOrThrow({ where: { id: params.payload } });
	},
});

Subscription.userUpdated({
	subscribe({ ctx }) {
		return ctx.pubsub.asyncIterator('user-updated');
	},
	resolve({ payload }) {
		return payload;
	},
});
