#!/usr/bin/env bash
set -euo pipefail

IMAGE="mcr.microsoft.com/playwright:v1.63.0-noble"

docker run --rm --ipc=host \
  -u "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$(pwd)":/work \
  -w /work \
  "$IMAGE" \
  /bin/bash -c '
    wget -qO- https://get.pnpm.io/install.sh | env ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
    source "$HOME/.bashrc"
    pnpm install --frozen-lockfile
    pnpm build
    pnpm test:e2e "$@"
  ' bash "$@"
