# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./        # copies package.json and package-lock.json
RUN npm install              # use npm install instead of npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

