#!/usr/bin/env sh

# cd frontend \
#     && pnpm fetch \
#     && pnpm install --ignore-scripts \
#     && pnpm run build
# cd ../backend \
    # && pnpm fetch \
    # && pnpm install --ignore-scripts \
cd /usr/src/app/backend && node migrate.js && node index.js
