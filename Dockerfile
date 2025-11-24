FROM node:20-alpine

RUN npm install -g pnpm@latest

RUN pnpm config set store-dir /pnpm/store

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD ["sh", "-c", "pnpm run gen-api && pnpm run dev --host"]