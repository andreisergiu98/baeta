#!/bin/bash

cp -r ./examples/yoga/src/modules ./examples/apollo/src
cp -r ./examples/yoga/src/__generated__ ./examples/apollo/src

cp -r ./examples/yoga-ws/src/modules ./examples/apollo-ws/src
cp -r ./examples/yoga-ws/src/__generated__ ./examples/apollo-ws/src

cp -r ./examples/yoga/src/modules ./examples/cloudflare/src
cp -r ./examples/yoga/src/__generated__ ./examples/cloudflare/src

cp -r ./examples/yoga-ws/src/modules ./examples/cloudflare-ws/src
cp -r ./examples/yoga-ws/src/__generated__ ./examples/cloudflare-ws/src

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -e 's/ctx\.pubsub\.publish/ctx.publish/g' -e 's/ctx\.pubsub\.asyncIterator/ctx.subscribe/g' ./examples/cloudflare-ws/src/modules/user/user.resolvers.ts
else
    sed -i -e 's/ctx\.pubsub\.publish/ctx.publish/g' -e 's/ctx\.pubsub\.asyncIterator/ctx.subscribe/g' ./examples/cloudflare-ws/src/modules/user/user.resolvers.ts
fi