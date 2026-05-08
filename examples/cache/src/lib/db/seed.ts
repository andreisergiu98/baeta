import { faker } from '@faker-js/faker';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { type Prisma, PrismaClient } from './prisma.ts';

export const prisma = new PrismaClient({
	adapter: new PrismaBetterSqlite3({
		url: 'file:./dev.db',
	}),
});

function generateUser() {
	const person: Prisma.UserCreateInput = {
		email: faker.internet.email(),
		lastName: faker.person.lastName(),
		givenName: faker.person.firstName(),
		birthday: faker.datatype.boolean() ? faker.date.past({ years: 20 }) : undefined,
		phoneNumber: faker.datatype.boolean() ? faker.phone.number() : undefined,
		profile: faker.datatype.boolean() ? faker.image.avatar() : undefined,
	};

	return person;
}

function generateUsers(len = 10) {
	const users = [];
	for (let i = 0; i < len; i++) {
		users.push(generateUser());
	}
	return users;
}

function generatePhoto() {
	const photo: Prisma.UserPhotoCreateWithoutUserInput = {
		url: faker.image.url(),
	};
	return photo;
}

function generatePhotos(len = 10) {
	const photos = [];
	for (let i = 0; i < len; i++) {
		photos.push(generatePhoto());
	}
	return photos;
}

async function insertUser(
	user: Prisma.UserCreateInput,
	photos: Prisma.UserPhotoCreateWithoutUserInput[],
) {
	return await prisma.user.create({
		data: {
			...user,
			photos: {
				createMany: {
					data: photos,
				},
			},
		},
	});
}

try {
	const users = generateUsers(faker.number.int({ min: 8, max: 15 }));

	const promises = users.map(async (user) => {
		const photos = generatePhotos(faker.number.int({ min: 7, max: 15 }));
		return await insertUser(user, photos);
	});

	await Promise.all(promises);
} finally {
	await prisma.$disconnect();
}
