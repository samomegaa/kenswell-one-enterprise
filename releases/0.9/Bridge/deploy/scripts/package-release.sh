#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:-0.9-RC2}"
OUT_DIR="${2:-releases/0.9/Bridge/deploy/artifacts}"

mkdir -p "$OUT_DIR"

ARCHIVE="$OUT_DIR/kenswell-one-bridge-${VERSION}.tar.gz"

tar \
  --exclude='**/node_modules' \
  --exclude='**/dist' \
  --exclude='**/.env' \
  --exclude='**/.env.local' \
  -czf "$ARCHIVE" \
  package.json \
  package-lock.json \
  releases/0.9/Bridge

echo "Release package created: $ARCHIVE"
