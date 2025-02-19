FROM node:18 AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.23.4 AS production-stage

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist/contabix /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
