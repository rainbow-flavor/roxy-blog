FROM node:lts

WORKDIR /node/docusaurus/app/

COPY . .

RUN npm install
RUN npm run build


FROM nginx:latest
EXPOSE 443
COPY --from=0 /node/docusaurus/app/build /usr/share/nginx/html