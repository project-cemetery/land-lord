FROM node:14-alpine as build

WORKDIR /app

ENV NODE_ENV=production

COPY . .
RUN yarn
RUN yarn gulp build

FROM nginx:1.19-alpine

COPY ./default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=build /app/build /srv/www

EXPOSE 8080