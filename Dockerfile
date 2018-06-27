FROM node:8.11.3

RUN apt-get update && apt-get install -y \
  python \
  make

WORKDIR /code

COPY .npmrc package.json package-lock.json /code/
RUN npm install --no-save

COPY . /code

ENV NPM_AUTH_TOKEN ''

