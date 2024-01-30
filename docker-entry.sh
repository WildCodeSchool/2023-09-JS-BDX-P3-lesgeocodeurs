#!/usr/bin/env sh

cd frontend && pnpm install --ignore-scripts
cd ../backend && pnpm install --ignore-scripts

npm run build
npm run start
