FROM node:14

WORKDIR /app

RUN apt-get update && apt-get install netcat-openbsd -y

ADD common/package.json ./common/package.json

ADD common/ ./common

RUN cd common && yarn install --production

ADD server/package.json ./server/package.json

ADD server/ ./server

RUN yarn install --production

