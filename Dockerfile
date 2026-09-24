FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /work

RUN npm install -g pnpm@12

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
