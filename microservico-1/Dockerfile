FROM node:16-alpine

WORKDIR /usr/src/api

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod"]