#syntax=docker/dockerfile:1.4
FROM node:20-alpine

RUN npm i -g pnpm

WORKDIR /usr/src/app
COPY --link ./backend/package.json /usr/src/app/backend/
COPY --link ./frontend/package.json ./frontend/mdb-react-ui-kit-pro-advanced.tgz /usr/src/app/frontend/
COPY --link ./frontend/plugins /usr/src/app/frontend/plugins

RUN cd backend && pnpm install --ignore-scripts
RUN cd frontend && pnpm install --ignore-scripts

COPY ./ .
