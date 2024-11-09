#!/bin/bash

cp -r ./examples/yoga/src/modules ./examples/apollo/src
cp -r ./examples/yoga/src/__generated__ ./examples/apollo/src

cp -r ./examples/yoga-ws/src/modules ./examples/apollo-ws/src
cp -r ./examples/yoga-ws/src/__generated__ ./examples/apollo-ws/src

cp -r ./examples/yoga/src/modules ./examples/cloudflare/src
cp -r ./examples/yoga/src/__generated__ ./examples/cloudflare/src

# cp -r ./examples/yoga-ws/src/modules ./examples/cloudflare-ws/src
cp -r ./examples/yoga-ws/src/__generated__ ./examples/cloudflare-ws/src
