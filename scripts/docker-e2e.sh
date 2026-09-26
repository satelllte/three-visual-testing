#!/usr/bin/env bash
set -euo pipefail

docker build -t three-visual-testing-e2e .

docker run --rm --init --ipc=host \
  -v "$(pwd)/tests-e2e:/work/tests-e2e" \
  -v "$(pwd)/test-results:/work/test-results" \
  -v "$(pwd)/playwright-report:/work/playwright-report" \
  three-visual-testing-e2e \
  /bin/bash -c '
    pnpm test:e2e "$@"
  ' bash "$@"
