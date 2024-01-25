# Dockerfile backend
FROM node:16.14

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json .
COPY ./backend/package.json ./backend/package-lock.json .
COPY ./frontend/package.json ./frontend/package-lock.json .

RUN npm install

COPY ./ .
