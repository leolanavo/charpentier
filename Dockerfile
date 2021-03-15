FROM node:15.10-alpine

WORKDIR /usr/app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY ./tsconfig.json ./

COPY ./src ./src

CMD yarn start

