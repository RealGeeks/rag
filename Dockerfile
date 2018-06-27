FROM node:8.11.3-alpine

RUN apk --update --no-cache add \
  python \
  make \
  build-base

WORKDIR /code

COPY .npmrc package.json package-lock.json /code/
RUN npm install

COPY . /code

ENV NPM_AUTH_TOKEN ''

