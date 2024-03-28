# Use the official Node.js image as the base image
FROM node:iron-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project
COPY . .

# Build the Vue.js app
RUN npm run build

# Use a lightweight server for serving the built app
FROM nginx:stable-alpine

# Copy the built app from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]