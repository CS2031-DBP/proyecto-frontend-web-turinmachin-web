# Credit: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:lts-alpine AS base

RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm
WORKDIR /app

# Dependencies layer
FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Build layer
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG API_URL_INTERNAL NEXT_PUBLIC_API_URL NEXT_PUBLIC_DEPLOYMENT_URL

ENV API_URL_INTERNAL=${API_URL_INTERNAL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_DEPLOYMENT_URL=${NEXT_PUBLIC_DEPLOYMENT_URL}

RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
