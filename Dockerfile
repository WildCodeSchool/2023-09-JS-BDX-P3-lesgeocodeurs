#syntax=docker/dockerfile:1.4
FROM node:20-alpine

WORKDIR /usr/src/app
COPY --link ./package.json ./package-lock.json ./
COPY --link ./backend/package.json ./backend/package-lock.json /usr/src/app/backend/
COPY --link ./frontend/package.json ./frontend/package-lock.json /usr/src/app/frontend/
COPY --link ./frontend/mdb-react-ui-kit-pro-advanced.tgz /usr/src/app/frontend/
COPY --link ./frontend/plugins /usr/src/app/frontend/plugins

RUN npm install

COPY ./ .
