# Credit: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:lts-alpine AS base

RUN apk add --no-cache git
RUN apk add --no-cache openssh
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

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_DEPLOYMENT_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_KEY
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG AUTH_SECRET
ARG API_URL_INTERNAL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_DEPLOYMENT_URL=${NEXT_PUBLIC_DEPLOYMENT_URL}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV API_URL_INTERNAL=${API_URL_INTERNAL}

RUN pnpm exec next telemetry disable
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

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/standalone/.next/

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
