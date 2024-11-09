#!/bin/bash

cp -r ./examples/_internal/src/modules ./examples/yoga/src
cp -r ./examples/_internal/src/__generated__ ./examples/yoga/src

cp -r ./examples/_internal/src/modules ./examples/cloudflare/src
cp -r ./examples/_internal/src/__generated__ ./examples/cloudflare/src


cp -r ./examples/_internal-ws/src/modules ./examples/yoga-ws/src
cp -r ./examples/_internal-ws/src/__generated__ ./examples/yoga-ws/src

cp -r ./examples/_internal-ws/src/modules ./examples/cloudflare-ws/src
cp -r ./examples/_internal-ws/src/__generated__ ./examples/cloudflare-ws/src
