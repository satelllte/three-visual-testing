#!/usr/bin/env bash
set -euo pipefail

docker build -t three-visual-testing-e2e .

docker run --rm --init --ipc=host \
  -v "$(pwd)/tests-e2e:/work/tests-e2e" \
  three-visual-testing-e2e \
  /bin/bash -c '
    pnpm test:e2e "$@"
  ' bash "$@"
