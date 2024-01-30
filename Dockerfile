#syntax=docker/dockerfile:1.4
FROM node:20-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

RUN corepack enable && \
	corepack prepare --activate pnpm@latest && \
	pnpm config -g set store-dir /.pnpm-store

COPY --link ./backend/package.json /usr/src/app/backend/
COPY --link ./frontend/package.json ./frontend/mdb-react-ui-kit-pro-advanced.tgz /usr/src/app/frontend/
COPY --link ./frontend/plugins /usr/src/app/frontend/plugins

RUN cd frontend && \
    pnpm fetch && \
    pnpm install
RUN cd backend && \
    pnpm fetch && \
    pnpm install

COPY ./frontend ./frontend

RUN cd frontend && \
    pnpm run build

COPY ./backend ./backend
COPY docker-entry.sh .

CMD ["sh","./docker-entry.sh"]
