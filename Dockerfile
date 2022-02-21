# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production=false
COPY . .
RUN yarn build --modern

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]