FROM node:lts

WORKDIR /node/docusaurus/app/

COPY . .

RUN npm install
RUN npm run build


FROM nginx:latest
COPY --from=0 /node/docusaurus/app/build /usr/share/nginx/html