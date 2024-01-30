#!/usr/bin/env sh

# cd frontend \
#     && pnpm fetch \
#     && pnpm install --ignore-scripts \
#     && pnpm run build
cd ../backend \
    # && pnpm fetch \
    # && pnpm install --ignore-scripts \
    && node migrate.js \
    && node index.js
