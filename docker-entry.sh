#!/usr/bin/env sh

cd /usr/src/app/backend && node migrate.js && node index.js
