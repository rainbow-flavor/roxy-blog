FROM node:19

WORKDIR /usr/src/app

COPY . ./

RUN npm install
RUN npm run build

COPY . .

CMD ["npm", "run", "serve"]