FROM node:18-alpine

WORKDIR /clone-git/ve-xe-re

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD [ "npm","run","build"]