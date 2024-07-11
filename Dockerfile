# Dockerfile

# Stage 1: Build the React app
FROM node:16-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code and build the application
COPY . .
RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build files
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to serve the React app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]