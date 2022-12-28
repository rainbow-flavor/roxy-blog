FROM node:19

WORKDIR /usr/src/app

COPY . ./

RUN npm install
RUN npm run build

COPY ./build .

CMD ["npm", "run", "serve"]