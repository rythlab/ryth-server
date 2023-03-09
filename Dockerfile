# Install dependencies only when needed
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json ./ 
RUN  yarn global add pnpm && pnpm fetch --prod && pnpm i -r --offline --production --frozen-lockfile


# Runner
FROM node:16-alpine AS runner

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn global add pnpm && pnpm install --frozen-lockfile
# RUN pnpm run build

EXPOSE 8000
CMD ["pnpm", "run", "start"]
