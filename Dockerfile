FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY ./build .

CMD ["npm", "run", "serve"]