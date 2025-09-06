FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

FROM base AS builder
WORKDIR /app

ARG NODE_ENV=production
ARG VITE_API_URL

ENV NODE_ENV=${NODE_ENV}
ENV VITE_API_URL=${VITE_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html

COPY docker/production/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
