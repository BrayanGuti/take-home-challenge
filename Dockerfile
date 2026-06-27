FROM node:24.15.0-alpine

WORKDIR /app

# Habilitar pnpm via corepack (incluido en Node)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar manifiestos primero para aprovechar la cache de Docker
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

RUN ls -la

# Expose the port
EXPOSE 3000