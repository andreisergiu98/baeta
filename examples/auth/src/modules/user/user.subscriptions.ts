import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';

const { Subscription } = UserModule;

const userCreatedSubscription = Subscription.userCreated
	.subscribe((params) => {
		return params.ctx.pubsub.subscribe('user-created');
	})
	.resolve((params) => {
		return db.user.findFirstOrThrow({ where: { id: params.source } });
	});

const userUpdatedSubscription = Subscription.userUpdated
	.subscribe(({ ctx }) => {
		return ctx.pubsub.subscribe('user-updated');
	})
	.resolve(({ source }) => {
		return source;
	});

export default Subscription.$fields({
	userCreated: userCreatedSubscription,
	userUpdated: userUpdatedSubscription,
});
