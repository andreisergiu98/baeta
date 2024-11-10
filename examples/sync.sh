#!/bin/bash

cp -r ./examples/yoga/src/{modules,__generated__} ./examples/apollo/src
cp -r ./examples/yoga-ws/src/{modules,__generated__} ./examples/apollo-ws/src
cp -r ./examples/yoga/src/{modules,__generated__} ./examples/cloudflare/src
cp -r ./examples/yoga-ws/src/{modules,__generated__} ./examples/cloudflare-ws/src

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -e 's/ctx\.pubsub\.publish/ctx.publish/g' -e 's/ctx\.pubsub\.asyncIterator/ctx.subscribe/g' ./examples/cloudflare-ws/src/modules/user/user.resolvers.ts
else
    sed -i -e 's/ctx\.pubsub\.publish/ctx.publish/g' -e 's/ctx\.pubsub\.asyncIterator/ctx.subscribe/g' ./examples/cloudflare-ws/src/modules/user/user.resolvers.ts
fi

cp -r ./examples/yoga-ws/src/app.ts ./examples/prisma/src

cp -r ./examples/prisma/src/{lib,modules} ./examples/auth/src
cp -r ./examples/prisma/{dev.db,.gitignore,schema.prisma} ./examples/auth

cp -r ./examples/prisma/src/{lib,modules,types,app.ts} ./examples/cache/src
cp -r ./examples/prisma/{dev.db,.gitignore,schema.prisma} ./examples/cache

cp -r ./examples/prisma/src/{lib,modules,types,app.ts} ./examples/cache-advanced/src
cp -r ./examples/prisma/{dev.db,.gitignore,schema.prisma} ./examples/cache-advanced

cp -r ./examples/prisma/src/{lib,modules,types,app.ts} ./examples/relay-pagination/src
cp -r ./examples/prisma/{dev.db,.gitignore,schema.prisma} ./examples/relay-pagination

yarn examples:build