FROM node:14

WORKDIR /app

COPY evt_server/package.json .

COPY evt_server/ .

RUN ls

RUN apt-get update && apt-get install netcat-openbsd -y 

RUN npm install --only-production

CMD [ "npm", "start" ]
