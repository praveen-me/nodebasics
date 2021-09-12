FROM node:14

WORKDIR /app

COPY server/package.json .

COPY server/ .

RUN ls

RUN apt-get update && apt-get install netcat-openbsd -y

RUN yarn install --production

CMD [ "npm", "start" ]
