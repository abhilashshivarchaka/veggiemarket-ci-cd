FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Set environment variable to use legacy OpenSSL behavior
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]