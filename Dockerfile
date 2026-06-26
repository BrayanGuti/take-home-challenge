FROM node:24.15.0-alpine


WORKDIR /app

COPY package.json .

RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

RUN ls -la

# Expose the port
EXPOSE 3000