# Dockerfile backend
FROM node:16.14

WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json .

WORKDIR /usr/src/app/backend
COPY ./backend/package.json ./backend/package-lock.json .

WORKDIR /usr/src/app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/mdb-react-ui-kit-pro-advanced.tgz ./frontend/plugins .

WORKDIR /usr/src/app
RUN npm install

COPY ./ .
